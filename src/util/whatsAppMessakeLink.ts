import { Linking } from 'react-native';

interface WhatsAppMessageLinkProps {
  phoneNumber: string;
  message: string;
}

function whatsAppMessageLink({
  phoneNumber,
  message,
}: WhatsAppMessageLinkProps) {
  Linking.openURL(`whatsapp://send?text=${message}&phone=${phoneNumber}`);
}

export { whatsAppMessageLink };
