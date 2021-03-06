// TODO: this file has some utility functions also present in foam-core testing
// they should be consolidated

import {
  URI,
  Attachment,
  NoteLinkDefinition,
  Note,
  Placeholder,
} from 'foam-core';

const position = {
  start: { line: 1, column: 1 },
  end: { line: 1, column: 1 },
};

const documentStart = position.start;
const documentEnd = position.end;
const eol = '\n';

/**
 * Turns a string into a URI
 * The goal of this function is to make sure we are consistent in the
 * way we generate URIs (and therefore IDs) across the tests
 */
export const strToUri = URI.file;

export const createPlaceholder = (params: { uri: string }): Placeholder => {
  return {
    uri: strToUri(params.uri),
    type: 'placeholder',
  };
};

export const createAttachment = (params: { uri: string }): Attachment => {
  return {
    uri: strToUri(params.uri),
    type: 'attachment',
  };
};

export const createTestNote = (params: {
  uri: string;
  title?: string;
  definitions?: NoteLinkDefinition[];
  links?: Array<{ slug: string } | { to: string }>;
  text?: string;
}): Note => {
  return {
    uri: strToUri(params.uri),
    type: 'note',
    properties: {},
    title: params.title ?? null,
    definitions: params.definitions ?? [],
    tags: new Set(),
    links: params.links
      ? params.links.map(link =>
          'slug' in link
            ? {
                type: 'wikilink',
                slug: link.slug,
                target: link.slug,
                position: position,
                text: 'link text',
              }
            : {
                type: 'link',
                target: link.to,
                label: 'link text',
              }
        )
      : [],
    source: {
      eol: eol,
      end: documentEnd,
      contentStart: documentStart,
      text: params.text ?? '',
    },
  };
};
