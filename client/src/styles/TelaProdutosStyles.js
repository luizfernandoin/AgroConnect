import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcfcfc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    elevation: 3,
    width: '100%',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Jost-SemiBold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 24,
  },
  flatListContent: {
    paddingBottom: 80,
    paddingHorizontal: 20,
  },
  row: {
    justifyContent: 'space-between',
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 10,
    overflow: 'hidden',
    shadowColor: 'rgba(0, 0, 0, 0.50)',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    elevation: 5,
    shadowOpacity: 1,
    width: (width / 2) - 30,
  },
  cardImage: {
    width: '100%',
    height: (width / 2) - 30,
  },
  textContainer: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
  cardPrice: {
    fontSize: 14,
    fontFamily: 'Jost-Regular',
    color: '#000',
  },
});