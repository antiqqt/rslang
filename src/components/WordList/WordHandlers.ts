import { AxiosInstance } from 'axios';
import { Howl } from 'howler';

import apiPaths from '../../common/api/api-paths';
import { AuthData } from '../../common/api/auth';
import environment from '../../common/environments/environment';
import { WordDifficulty } from '../../common/types/WordData';

const handleAudio = (
  src: string,
  isPlaying: boolean,
  sound: Howl | null,
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>,
  setSound: React.Dispatch<React.SetStateAction<Howl | null>>
) => {
  if (isPlaying && sound) {
    sound.stop();
    setPlaying(false);
    setSound(null);
  }
  if (!isPlaying) {
    const newSound = new Howl({
      src,
      onend: () => {
        setPlaying(false);
        setSound(null);
      },
    });
    setPlaying(true);
    setSound(newSound);
    newSound.play();
  }
};

const handleWord = async (
  wordId: string,
  axios: AxiosInstance,
  auth: AuthData | null,
  operation: 'create' | 'update' | 'delete',
  wordType: WordDifficulty
) => {
  if (!auth) return;
  const { Users, Words } = apiPaths;

  if (operation === 'create') {
    axios.post(
      `${environment.baseUrl}${Users}/${auth.userId}${Words}/${wordId}`,
      {
        difficulty: wordType,
        optional: {},
      }
    );
    return;
  }

  if (operation === 'update') {
    axios.put(
      `${environment.baseUrl}${Users}/${auth.userId}${Words}/${wordId}`,
      {
        difficulty: wordType,
        optional: {},
      }
    );
    return;
  }

  axios.delete(
    `${environment.baseUrl}${Users}/${auth.userId}${Words}/${wordId}`
  );
};

export { handleAudio, handleWord };
