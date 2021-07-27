import React, {PureComponent} from 'react';
import {Text, View, FlatList, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AppHeader from '../../Componant/AppHeader';
import Card from '../../Componant/Card';
import {Const} from '../../Helper';
import {styles} from './UserProductScreenStyle';

class UserProductScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
    };
  }
  componentDidMount() {
    this.userDataHandler();
  }

  userDataHandler = () => {
    const {userProducts} = this.props;
    //console.log('items:', userProducts);
    let uData = [];
    for (const key in userProducts[0]) {
      console.log('UserProducts, ', userProducts[0][key]);
      uData.push({
        id: userProducts[0][key].id,
        ownerID: userProducts[0][key].ownerID,
        title: userProducts[0][key].title,
        imageURL: userProducts[0][key].imageURL,
        description: userProducts[0][key].description,
        price: userProducts[0][key].price,
      });
      this.setState({userData: uData});
    }
  };

  renderItem = itemData => {
    console.log('itemData:', itemData);
    const {deleteItem} = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('EditProductScreen', {
            productId: itemData.item.id,
          });
        }}>
        <View style={styles.container}>
          <Card style={styles.cardView}>
            <Image source={{uri: itemData.item.imageURL}} style={styles.hw50} />
            <Text>{itemData.item.title}</Text>
            <View style={styles.rowView}>
              <View style={styles.buttonView}>
                <TouchableOpacity
                  onPress={() => {
                    deleteItem.deleteProduct(itemData.item.id);
                  }}>
                  <Text>Delete</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.buttonView}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('EditProductScreen', {
                      productId: itemData.item.id,
                    });
                  }}>
                  <Text>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Card>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    const {userData} = this.state;
    // const {userProducts} = this.props;
    return (
      <View>
        <AppHeader title="User Product" isMenu isADD {...this.props} />
        <FlatList
          data={userData}
          keyExtractor={item => item.id}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    userProducts: state.products.userProducts,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    deleteItem: bindActionCreators(Const.productAction, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProductScreen);
