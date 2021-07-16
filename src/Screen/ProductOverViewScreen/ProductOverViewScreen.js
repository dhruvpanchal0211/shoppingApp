import React, {PureComponent} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
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
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.products !== this.props.products) {
      this.serverItem();
    }
  }
  componentDidMount() {
    const {fetchData, products} = this.props;
    fetchData.fetchProduct();
    this.serverItem();
  }

  serverItem = () => {
    const {products} = this.props;
    let fData = [];

    for (const key in products[0]) {
      console.log('serverItem log:', products[0][key].title);

      fData.push({
        id: products[0][key].id,
        ownerId: products[0][key].ownerId,
        title: products[0][key].title,
        imageURL: products[0][key].imageURL,
        price: products[0][key].price,
        description: products[0][key].description,
      });
    }
    this.setState({fetchedData: fData});
  };

  renderItem = itemData => {
    const {AddToCart} = this.props;
    console.log('state items:', this.state);

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
    const {products} = this.props;
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
          contentContainerStyle={{paddingVertical: 20}}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  console.log('store data:', state.products.availableProducts);
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
