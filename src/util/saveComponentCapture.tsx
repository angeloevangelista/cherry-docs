import React from 'react';
import { Platform } from 'react-native';
import { captureRef } from 'react-native-view-shot';
import CameraRoll from '@react-native-community/cameraroll';

import { requestExternalWritePermission } from './requestExternalWritePermission';

interface SaveComponentCaptureProps<T> {
  album: string;
  saveFile: boolean;
  componentRef: React.RefObject<T>;
}

interface SaveComponentCaptureResponse {
  granted: boolean;
  image: string | null;
  capturedRefUri: string;
}

async function saveComponentCapture<T>({
  album,
  saveFile,
  componentRef,
}: SaveComponentCaptureProps<T>): Promise<SaveComponentCaptureResponse> {
  const capturedRefUri = await captureRef(componentRef, {
    quality: 1,
    format: 'png',
    snapshotContentContainer: true,
  });

  const granted =
    Platform.OS === 'android' ? await requestExternalWritePermission() : true;

  if (!granted) {
    return {
      granted,
      image: null,
      capturedRefUri,
    };
  }

  const image = saveFile
    ? await CameraRoll.save(capturedRefUri, {
        album,
        type: 'photo',
      })
    : null;

  return {
    image,
    granted,
    capturedRefUri,
  };
}

export { saveComponentCapture };
