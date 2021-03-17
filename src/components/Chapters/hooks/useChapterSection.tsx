import { book, bookmark } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';
import { ChapterId } from '../index';
import { getIdFromChapterIdAndSectionId, getChapterColor } from '../utils';
import { useChapterSectionContent } from './useChapterSectionContent';

export const useChapterSection = (chapterId: ChapterId, sectionId: string) => {
  const { t } = useTranslation();

  const color = getChapterColor(chapterId);
  const { Content, text } = useChapterSectionContent(chapterId, sectionId);

  const isHeader = sectionId === '00';

  return {
    color,
    icon: isHeader ? book : bookmark,
    id: getIdFromChapterIdAndSectionId(chapterId, sectionId),
    image: {
      original: t(`CHAPTER.${chapterId}.${sectionId}.IMAGE.01.FILENAME`),
      thumbnail: {
        small: t(`CHAPTER.${chapterId}.${sectionId}.IMAGE.01.THUMBNAIL.SMALL`),
        medium: t(
          `CHAPTER.${chapterId}.${sectionId}.IMAGE.01.THUMBNAIL.MEDIUM`,
        ),
        large: t(`CHAPTER.${chapterId}.${sectionId}.IMAGE.01.THUMBNAIL.LARGE`),
      },
    },
    isHeader,
    title: {
      chapter: t(`CHAPTER.${chapterId}.00.TITLE`) || '',
      section: t(`CHAPTER.${chapterId}.${sectionId}.TITLE`) || '',
    },
    url: `/chapter/${chapterId}/${sectionId}`,
    view: {
      list: {
        content: <>{text[0] || ''}</>,
      },
      page: {
        Content,
        text,
      },
    },
  };
};