import {
  IonButton,
  IonButtons,
  IonFooter,
  IonIcon,
  IonToolbar,
} from '@ionic/react';
import { arrowBack, arrowForward, star, starOutline } from 'ionicons/icons';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsFavoriteById } from '../../data/user/user.selector';
import { addFavorite, removeFavoriteById } from '../../data/user/user.slice';
import { CS } from '../Chapters';
import { getIdFromChapterIdAndSectionId } from '../Chapters/utils';
import {
  getChapterNextSectionUrl,
  getChapterPreviousSectionUrl,
} from './utils';

export const ChapterFooter: FC<CS> = ({ chapterId, sectionId }) => {
  const id = getIdFromChapterIdAndSectionId({ chapterId, sectionId });
  const next = getChapterNextSectionUrl({ chapterId, sectionId });
  const previous = getChapterPreviousSectionUrl({ chapterId, sectionId });
  const isFavorite = useSelector(selectIsFavoriteById(id));
  const dispatch = useDispatch();

  const toggleFavorite = () => {
    if (isFavorite) {
      return dispatch(removeFavoriteById(id));
    }
    return dispatch(
      addFavorite({ addedAt: new Date(), chapterId, id, sectionId }),
    );
  };

  return (
    <IonFooter>
      <IonToolbar color="light">
        <IonButtons class="ion-justify-content-between">
          <IonButton fill="clear" routerDirection="back" routerLink={previous}>
            <IonIcon icon={arrowBack} slot="icon-only"></IonIcon>
          </IonButton>
          <IonButton
            color={isFavorite ? 'warning' : ''}
            fill="clear"
            onClick={() => toggleFavorite()}
          >
            <IonIcon
              icon={isFavorite ? star : starOutline}
              slot="icon-only"
            ></IonIcon>
          </IonButton>
          <IonButton fill="clear" routerLink={next} size="small">
            <IonIcon icon={arrowForward} slot="icon-only"></IonIcon>
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonFooter>
  );
};
