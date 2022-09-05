import { AxiosInstance } from 'axios';
import { Howl } from 'howler';

import { AuthData } from '../../common/api/auth';
import WordData, { WordDifficulty } from '../../common/types/WordData';
import { createWordURL } from '../../common/utilities/Utilities';

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
  userWord: WordData['userWord'],
  axios: AxiosInstance,
  auth: AuthData | null,
  operation: 'create' | 'update' | 'delete',
  newWordType: WordDifficulty
) => {
  if (!auth) return;

  if (operation === 'create') {
    await axios.post(createWordURL(auth.userId, wordId), {
      difficulty: newWordType,
      optional: {
        progress: 0,
        record: {
          audiochallenge: [0, 0],
          sprint: [0, 0],
        },
      },
    });
    return;
  }

  if (operation === 'update') {
    await axios.put(createWordURL(auth.userId, wordId), {
      difficulty: newWordType,
      optional: userWord?.optional,
    });
    return;
  }

  await axios.delete(createWordURL(auth.userId, wordId));
};

export { handleAudio, handleWord };
