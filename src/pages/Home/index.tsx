import React, { useCallback, useMemo, useRef } from 'react';
import {
  Alert,
  StyleProp,
  TextInput,
  ToastAndroid,
  ViewStyle,
} from 'react-native';

import Share from 'react-native-share';
import { ScrollView } from 'react-native-gesture-handler';

import FeatherIcons from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Header,
  HeaderActionButton,
  HeaderActions,
  TextArea,
} from './styles';

import { wait } from '../../util/wait';
import { whatsAppMessageLink } from '../../util/whatsAppMessakeLink';
import { saveComponentCapture } from '../../util/saveComponentCapture';

const phoneNumber = '5513997244863';
const textScrollContainerStyle: StyleProp<ViewStyle> = { flexGrow: 1 };

const Home: React.FC = () => {
  const textScrollViewRef = useRef<ScrollView>(null);
  const textAreaRef = useRef<TextInput>(null);

  const [text, setText] = React.useState('');
  const [isEditing, setIsEditing] = React.useState(false);
  const [useEncoded, setUseEncoded] = React.useState(false);
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const iconsColor = useMemo(
    () => (isDarkTheme ? '#909090' : '#000'),
    [isDarkTheme],
  );

  const prepareTextToBeCaptured = useCallback(async () => {
    setIsEditing(false);
    setUseEncoded(true);

    textAreaRef.current?.blur();

    await wait(100);
  }, []);

  const handleHeartPress = useCallback(() => {
    Alert.alert('Ouch...', 'O Angelo não programou nada aqui 💜', [
      {
        text: 'Eu sabia já',
        onPress: () => {
          Alert.alert(
            '🥰',
            'Mas ele fica felizão em saber que você gostou do app',
            [
              {
                text: 'Vou lá falar pra ele o que eu achei 😆',
                onPress: () =>
                  whatsAppMessageLink({
                    phoneNumber,
                    message:
                      'Ae lindão. Deu erro aqui na hora de gerar a imagem do cherry code 😢',
                  }),
              },
            ],
          );
        },
      },
    ]);
  }, []);

  const handleSharePress = useCallback(async () => {
    await prepareTextToBeCaptured();

    const { capturedRefUri, granted } = await saveComponentCapture({
      saveFile: false,
      album: 'Cherry Docs',
      componentRef: textScrollViewRef,
    });

    if (!granted) {
      whatsAppMessageLink({
        phoneNumber,
        message: 'Ei ei, por quê você quer acessar meus arquivos??',
      });

      return;
    }

    Share.open({
      title: 'Compartilhar',
      url: capturedRefUri,
    })
      .then((shared) => {
        if (!shared.success) {
          throw new Error('User did not share');
        }
      })
      .catch(() =>
        ToastAndroid.showWithGravity(
          'Eu vi que você não enviou pra ninguém 🧐',
          2000,
          ToastAndroid.TOP,
        ),
      );
  }, [prepareTextToBeCaptured]);

  const handleClearPress = useCallback(() => {
    Alert.alert('❌', 'Quer apagar tudo mesmo?', [
      { text: 'Nha, tava só vendo' },
      { text: 'Aham', onPress: () => setText('') },
    ]);
  }, []);

  const handleSavePress = useCallback(async () => {
    try {
      await prepareTextToBeCaptured();

      const { image } = await saveComponentCapture({
        saveFile: true,
        album: 'Cherry Docs',
        componentRef: textScrollViewRef,
      });

      if (image) {
        ToastAndroid.showWithGravity(
          'Salvei lá na sua galeria ;)',
          2000,
          ToastAndroid.TOP,
        );
      } else {
        Alert.alert(
          '😱',
          'Deu um erro aí hein. Fala com o Angelo que ele vê procê 😗',
          [
            {
              text: 'Tá bom',
              onPress: () =>
                whatsAppMessageLink({
                  phoneNumber,
                  message:
                    'Ae lindão. Deu erro aqui na hora de gerar a imagem do Cherry code 😢',
                }),
            },
          ],
        );
      }
    } catch (error) {
      Alert.alert(
        '😬',
        'Deu um erro aí hein. Fala com o Angelo que ele vê procê 😗',
      );
    }
  }, [prepareTextToBeCaptured]);

  return (
    <Container isDarkTheme={isDarkTheme}>
      <Header>
        {isEditing && (
          <HeaderActionButton
            onPress={() => {
              setIsEditing(false);

              textAreaRef.current?.blur();
            }}>
            <FeatherIcons name="check" size={20} color={iconsColor} />
          </HeaderActionButton>
        )}

        <HeaderActions>
          <HeaderActionButton onPress={handleHeartPress}>
            <EvilIcons name="heart" size={24} color={iconsColor} />
          </HeaderActionButton>

          <HeaderActionButton onPress={() => setIsDarkTheme(!isDarkTheme)}>
            <FeatherIcons
              name={isDarkTheme ? 'sun' : 'moon'}
              size={20}
              color={iconsColor}
            />
          </HeaderActionButton>

          <HeaderActionButton onPress={handleClearPress}>
            <EvilIcons name="close" size={24} color={iconsColor} />
          </HeaderActionButton>

          <HeaderActionButton onPress={handleSavePress}>
            <FeatherIcons name="save" size={20} color={iconsColor} />
          </HeaderActionButton>

          <HeaderActionButton onPress={() => setUseEncoded(!useEncoded)}>
            <MaterialIcons name="translate" size={20} color={iconsColor} />
          </HeaderActionButton>

          <HeaderActionButton onPress={handleSharePress}>
            <EvilIcons name="share-google" size={24} color={iconsColor} />
          </HeaderActionButton>
        </HeaderActions>
      </Header>

      <ScrollView
        ref={textScrollViewRef}
        contentContainerStyle={textScrollContainerStyle}
        onTouchEndCapture={() => {
          setIsEditing(true);
          setTimeout(() => textAreaRef.current?.focus(), 50);
        }}>
        <TextArea
          multiline
          focusable
          placeholder="Você sabe o que precisa fazer ;)"
          value={text}
          ref={textAreaRef}
          autoCorrect={false}
          editable={isEditing}
          onChangeText={setText}
          useEncoded={useEncoded}
          caretHidden={!isEditing}
          isDarkTheme={isDarkTheme}
          selection={
            textAreaRef.current?.isFocused
              ? undefined
              : { start: text.length, end: text.length }
          }
        />
      </ScrollView>
    </Container>
  );
};

export { Home };
