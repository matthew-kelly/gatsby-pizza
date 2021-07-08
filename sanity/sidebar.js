import React from 'react';
import S from '@sanity/desk-tool/structure-builder';
import { MdHome as icon } from 'react-icons/md';

// build a custom sidebar
export default function Sidebar() {
  return S.list()
    .title(`Slick's Slices`)
    .items([
      // create a new sub-item
      S.listItem().title('Home Page').icon(icon).child(
        S.editor()
          .schemaType('storeSettings')
          // make a new documentId so it isn't a random string of numbers
          .documentId('main-store')
      ),
      // add in the rest of the document items (except settings)
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== 'storeSettings'
      ),
    ]);
}
