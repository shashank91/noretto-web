'use client';

import React from 'react';
import Image from 'next/image';
import { LexicalNode, LexicalContent } from '@/lib/types';
import { getMediaUrl } from '@/lib/payload';
import styles from './RichText.module.css';

interface RichTextProps {
  content: LexicalContent;
  className?: string;
}

export function RichText({ content, className }: RichTextProps) {
  if (!content?.root?.children) {
    return null;
  }

  return (
    <div className={`${styles.prose} ${className || ''}`}>
      {content.root.children.map((node, index) => (
        <RenderNode key={index} node={node} />
      ))}
    </div>
  );
}

function RenderNode({ node }: { node: LexicalNode }): React.ReactNode {
  switch (node.type) {
    case 'paragraph':
      if (!node.children?.length) {
        return <br />;
      }
      return (
        <p>
          {node.children?.map((child, i) => (
            <RenderNode key={i} node={child} />
          ))}
        </p>
      );

    case 'heading':
      const HeadingTag = (node.tag || 'h2') as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
      return (
        <HeadingTag>
          {node.children?.map((child, i) => (
            <RenderNode key={i} node={child} />
          ))}
        </HeadingTag>
      );

    case 'text':
      let textContent: React.ReactNode = node.text || '';
      const format = typeof node.format === 'number' ? node.format : 0;
      
      // Apply text formatting (Lexical uses bitmask)
      if (format & 1) textContent = <strong>{textContent}</strong>; // Bold
      if (format & 2) textContent = <em>{textContent}</em>; // Italic
      if (format & 4) textContent = <s>{textContent}</s>; // Strikethrough
      if (format & 8) textContent = <u>{textContent}</u>; // Underline
      if (format & 16) textContent = <code>{textContent}</code>; // Code
      if (format & 32) textContent = <sub>{textContent}</sub>; // Subscript
      if (format & 64) textContent = <sup>{textContent}</sup>; // Superscript
      
      return textContent;

    case 'link':
    case 'autolink':
      return (
        <a 
          href={node.url || '#'} 
          target={node.newTab ? '_blank' : undefined}
          rel={node.newTab ? 'noopener noreferrer' : undefined}
        >
          {node.children?.map((child, i) => (
            <RenderNode key={i} node={child} />
          ))}
        </a>
      );

    case 'list':
      const ListTag = node.listType === 'number' ? 'ol' : 'ul';
      return (
        <ListTag start={node.start}>
          {node.children?.map((child, i) => (
            <RenderNode key={i} node={child} />
          ))}
        </ListTag>
      );

    case 'listitem':
      return (
        <li>
          {node.children?.map((child, i) => (
            <RenderNode key={i} node={child} />
          ))}
        </li>
      );

    case 'quote':
      return (
        <blockquote>
          {node.children?.map((child, i) => (
            <RenderNode key={i} node={child} />
          ))}
        </blockquote>
      );

    case 'horizontalrule':
      return <hr />;

    case 'linebreak':
      return <br />;

    case 'upload':
      if (node.value && node.relationTo === 'media') {
        const media = node.value;
        const imageUrl = getMediaUrl(media.sizes?.medium?.url || media.url);
        return (
          <figure className={styles.figure}>
            <Image
              src={imageUrl}
              alt={media.filename || 'Image'}
              width={media.sizes?.medium?.width || media.width || 800}
              height={media.sizes?.medium?.height || media.height || 600}
              className={styles.image}
            />
          </figure>
        );
      }
      return null;

    case 'block':
      // Handle Payload block types (Media Block, etc.)
      if (node.fields?.blockType === 'mediaBlock' && node.fields?.media) {
        const media = node.fields.media;
        const imageUrl = getMediaUrl(media.sizes?.large?.url || media.sizes?.medium?.url || media.url);
        return (
          <figure className={styles.figure}>
            <Image
              src={imageUrl}
              alt={media.filename || 'Image'}
              width={media.sizes?.large?.width || media.sizes?.medium?.width || media.width || 800}
              height={media.sizes?.large?.height || media.sizes?.medium?.height || media.height || 600}
              className={styles.image}
            />
          </figure>
        );
      }
      // Handle other block types here as needed
      return null;

    case 'code':
      return (
        <pre className={styles.codeBlock}>
          <code>
            {node.children?.map((child, i) => (
              <RenderNode key={i} node={child} />
            ))}
          </code>
        </pre>
      );

    default:
      // For unknown types, try to render children
      if (node.children) {
        return (
          <>
            {node.children.map((child, i) => (
              <RenderNode key={i} node={child} />
            ))}
          </>
        );
      }
      return null;
  }
}
