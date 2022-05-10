import { Alert, Platform, PermissionsAndroid } from 'react-native';

async function requestExternalWritePermission() {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Bora salvar o arquivo?',
          message:
            'Hey, eu preciso que você acredite em mim e me deixe acessar seus arquivos',
          buttonPositive: 'Tá bom ^^',
        },
      );

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      Alert.alert('Ouch', 'Poxa... Pergunta lá pro Angelo que ele te explica');

      return false;
    }
  } else {
    return true;
  }
}

export { requestExternalWritePermission };
