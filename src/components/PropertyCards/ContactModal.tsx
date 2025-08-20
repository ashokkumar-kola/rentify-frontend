import React from 'react';
import { Modal, View, Text, Image, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import Icons from '../../constants/Icons';
import images from '../../assets/images';

interface Landlord {
  id: string;
  full_name: string;
  email: string;
  phone_no?: string;
  profile_image?: string;
  is_verified: boolean;
}

interface ContactModalProps {
  visible: boolean;
  landlord: Landlord | null;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ visible, landlord, onClose }) => {
  if (!landlord) {return null;}

  const handleCall = () => {
    if (landlord.phone_no) {
      Linking.openURL(`tel:${landlord.phone_no}`);
      onClose();
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.card}>
          {/* Profile Section */}
          <Image
            source={ images.defaultProfileImg } // { uri: landlord.profile_image || }
            style={styles.image}
          />

          <Text style={styles.name}>{landlord.full_name}</Text>

          {landlord.is_verified && (
            <View style={styles.verifiedBadge}>
              <Icons.FA name="check-circle" size={16} color="green" />
              <Text style={styles.verifiedText}>Verified</Text>
            </View>
          )}

          <Text style={styles.email}>{landlord.email}</Text>
          {landlord.phone_no && <Text style={styles.phone}>{landlord.phone_no}</Text>}

          {/* Actions */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            {landlord.phone_no && (
              <TouchableOpacity style={styles.callBtn} onPress={handleCall}>
                <Icons.FA name="phone" size={16} color="#fff" />
                <Text style={styles.callText}>Call Now</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ContactModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  verifiedText: {
    marginLeft: 4,
    color: 'green',
    fontSize: 14,
  },
  email: {
    color: '#666',
    marginTop: 4,
  },
  phone: {
    color: '#333',
    marginTop: 4,
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'row',
    marginTop: 20,
  },
  cancelBtn: {
    backgroundColor: '#eee',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 10,
  },
  cancelText: {
    color: '#333',
    fontWeight: '500',
  },
  callBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  callText: {
    color: '#fff',
    marginLeft: 6,
    fontWeight: '500',
  },
});
