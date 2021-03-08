import { DocumentInitialProps } from 'next/document';
import type { PageObject } from '../commonTypes';
import type { DocumentType, RenderPage } from 'next/dist/next-server/lib/utils';
export default function fetchDocumentData({ Document, pageObject, renderPage, }: {
    Document: DocumentType;
    pageObject: PageObject;
    renderPage: RenderPage;
}): Promise<DocumentInitialProps>;
