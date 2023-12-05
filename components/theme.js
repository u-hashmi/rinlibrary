const colors = {
  primary: '#2ecc71',
  secondary: '#e67e22',
  accent: '#e74c3c',
  text: '#333333',
  background: '#ffffff',
  inputLabelTextColor: 'gray'
};

const textStyles = {
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    fontFamily: 'Gabarito',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '400',
    color: colors.text,
    fontFamily: 'Gabarito',
  },
  body: {
    fontSize: 16,
    color: colors.text,
    fontFamily: 'Gabarito',
  },
  caption: {
    fontSize: 14,
    color: colors.text,
    fontFamily: 'Gabarito',
  },
};

const viewStyles = {
  smallShadow: {
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2, 
    backgroundColor: 'white',
  },
  mediumShadow: {
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
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
};


export { colors, textStyles, viewStyles };
