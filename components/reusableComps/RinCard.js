import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RinCard = ({ children, variant, shadow, style }) => {
  const cardStyles = [styles.card];

  switch (variant) {
    case 'outlined':
      cardStyles.push(styles.outlined);
      break;
    default:
      break;
  }

  switch (shadow) {
    case 'large':
      cardStyles.push(styles.largeShadow);
      break;
    case 'medium':
      cardStyles.push(styles.mediumShadow);
      break;
    case 'none': break;
    default:
      cardStyles.push(styles.smallShadow);
      break;
  }

  return <View style={[cardStyles, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  mediumShadow: {
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    backgroundColor: 'white',
  },
  smallShadow: {
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
    backgroundColor: 'white',
  },
  largeShadow: {
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
    backgroundColor: 'white',
  },
  outlined: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.12)',
    backgroundColor: 'white',
  },
  card: {
    display: 'flex',
    padding: 15,
    margin: 10,
    borderRadius: 3,
  },
});

export default RinCard;
