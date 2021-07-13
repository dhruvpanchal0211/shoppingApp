import React, {PureComponent} from 'react';
import {
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AppHeader from '../../Componant/AppHeader';
import {Const} from '../../Helper';
import {styles} from './EditProductScreenStyle';

class EditProductScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      imageURL: '',
      description: '',
      price: '',
    };
  }
  componentDidMount() {
    const {userProducts} = this.props;
    const {productId} = this.props.route.params;
    for (const key in userProducts) {
      if (userProducts[key].id === productId) {
        this.setState({
          title: userProducts[key].title,
          imageURL: userProducts[key].imageURL,
          description: userProducts[key].description,
        });
      }
    }
  }
  onSubmit = () => {
    const {title, imageURL, price, description} = this.state;
    console.log('state Itemm: ', this.state);
    const {updateItem} = this.props;
    const {productId} = this.props.route.params;
    console.log('submitted!!!!', productId);
    if (productId) {
      updateItem.updateProduct(productId, title, imageURL, description);
    } else {
      updateItem.addProduct(title, imageURL, +price, description);
    }
    this.props.navigation.navigate('UserProductScreen');
  };
  render() {
    const {userProducts} = this.props;
    const {productId} = this.props.route.params;
    const {title, imageURL, price, description} = this.state;
    console.log('edit product id:', productId);

    return (
      <View>
        <AppHeader
          title={productId ? 'Edit Product' : 'Add Product'}
          isBack
          {...this.props}
        />
        <ScrollView>
          <View style={styles.form}>
            <View style={styles.formControl}>
              <Text style={styles.lable}>Title</Text>
              <TextInput
                style={styles.input}
                value={title}
                onChangeText={title => {
                  this.setState({title});
                }}
              />
            </View>
            <View style={styles.formControl}>
              <Text style={styles.lable}>ImageURL</Text>
              <TextInput
                style={styles.input}
                value={imageURL}
                onChangeText={imageURL => {
                  this.setState({imageURL});
                }}
              />
            </View>
            {productId ? null : (
              <View style={styles.formControl}>
                <Text style={styles.lable}>Price</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={price => {
                    this.setState({price});
                  }}
                />
              </View>
            )}
            <View style={styles.formControl}>
              <Text style={styles.lable}>Description</Text>
              <TextInput
                style={styles.input}
                value={description}
                multiline
                onChangeText={description => {
                  this.setState({description});
                }}
              />
            </View>
          </View>
          <View style={styles.submitView}>
            <TouchableOpacity
              style={styles.submitButtonm}
              onPress={() => {
                this.onSubmit();
              }}>
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  console.log('edit USerdata: ', state.products.userProducts);
  return {
    userProducts: state.products.userProducts,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    updateItem: bindActionCreators(Const.productAction, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProductScreen);
