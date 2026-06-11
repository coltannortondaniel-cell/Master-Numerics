import { createContext, useContext, type ReactNode } from "react";
import { physicsApi, type ContentApi } from "./physics";

/**
 * Provides the active subject's content API to the shared lesson components
 * (LessonViewer, ConceptCheck, PracticeSet) so they work for both the Physics
 * Journey and the Math City without knowing which is which.
 */
const ContentApiContext = createContext<ContentApi>(physicsApi);

export function ContentApiProvider({
  api,
  children,
}: {
  api: ContentApi;
  children: ReactNode;
}) {
  return <ContentApiContext.Provider value={api}>{children}</ContentApiContext.Provider>;
}

export function useContentApi(): ContentApi {
  return useContext(ContentApiContext);
}
