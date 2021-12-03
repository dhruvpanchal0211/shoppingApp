import React, {PureComponent} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
  Animated,
} from 'react-native';
import {styles} from './ProductOverViewScreenStyle';
import AppHeader from '../../Componant/AppHeader';
import {connect} from 'react-redux';
import Card from '../../Componant/Card';
import {Const} from '../../Helper';
import {bindActionCreators} from 'redux';

class ProductOverViewScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      fetchedData: [],
      loading: false,
      // scrollY: new Animated.Value(0).current,
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.products !== this.props.products) {
      this.serverItem();
    }
  }
  componentDidMount() {
    const {fetchData} = this.props;
    fetchData.fetchProduct();
    this.serverItem();
  }

  serverItem = () => {
    const {products} = this.props;
    let fData = [];

    for (const key in products) {
      fData.push({
        id: products[key].id,
        ownerId: products[key].ownerId,
        title: products[key].title,
        imageURL: products[key].imageURL,
        description: products[key].description,
      });
    }
    this.setState({fetchedData: fData});
  };

  renderItem = (itemData, index) => {
    const {scrollY} = this.state;
    const ITEM_DATA = 20;
    const {AddToCart} = this.props;
    const inputRange = [-1, 0, ITEM_DATA * index, ITEM_DATA * (index + 2)];
    const outputRange = [1, 1, 1, 0];
    return (
      <ScrollView>
        <View>
          <Card style={styles.cardView}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('ProductDetailsScreen', {
                  itemData,
                });
              }}>
              <Image
                source={{uri: itemData.item.imageURL}}
                style={styles.image}
              />
              <Text style={styles.text}>{itemData.item.title}</Text>
              <Text style={styles.text}>{itemData.item.price}</Text>
              <View style={styles.buttonView}>
                <TouchableOpacity
                  onPress={() => {
                    AddToCart.addToCart(itemData.item);
                  }}>
                  <View style={styles.cartButton}>
                    <Text>Add To Cart</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </Card>
        </View>
      </ScrollView>
    );
  };
  render() {
    const {scrollY} = this.state;
    return (
      <View style={styles.container}>
        <AppHeader
          title="ProductOverViewScreen"
          isMenu
          isCart
          {...this.props}
        />
        <FlatList
          data={this.state.fetchedData}
          keyExtractor={(item, index) => index}
          renderItem={this.renderItem}
          // onScroll={Animated.event(
          //   [{nativeEvent: {contentOffset: {y: scrollY}}}],
          //   {useNativeDriver: true},
          // )}
          // contentContainerStyle={styles.flatList}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products.availableProducts,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    AddToCart: bindActionCreators(Const.cartAction, dispatch),
    fetchData: bindActionCreators(Const.productAction, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductOverViewScreen);
