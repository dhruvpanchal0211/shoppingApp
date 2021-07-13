import React, {PureComponent} from 'react';
import {Text, View, TextInput, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import AppHeader from '../../Componant/AppHeader';
import {styles} from './EditProductScreenStyle';

class EditProductScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      imageURL: '',
      description: '',
    };
  }
  render() {
    const {userProducts, isPrice} = this.props;
    const {productId} = this.props.route.params;
    console.log('edit product id:', productId);

    for (const key in userProducts) {
      if (userProducts[key].id === productId) {
        this.setState({
          title: userProducts[key].title,
          imageURL: userProducts[key].imageURL,
          description: userProducts[key].description,
        });
      }
    }
    return (
      <View>
        <AppHeader
          title={productId ? 'Edit Product' : 'Add Product'}
          isBack
          isSave
          {...this.props}
        />
        <ScrollView>
          <View style={styles.form}>
            <View style={styles.formControl}>
              <Text style={styles.lable}>Title</Text>
              <TextInput style={styles.input} value={this.state.title} />
            </View>
            <View style={styles.formControl}>
              <Text style={styles.lable}>ImageURL</Text>
              <TextInput style={styles.input} value={this.state.imageURL} />
            </View>
            {productId ? null : (
              <View style={styles.formControl}>
                <Text style={styles.lable}>Price</Text>
                <TextInput style={styles.input} />
              </View>
            )}
            <View style={styles.formControl}>
              <Text style={styles.lable}>Description</Text>
              <TextInput
                style={styles.input}
                value={this.state.description}
                multiline
              />
            </View>
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

export default connect(mapStateToProps)(EditProductScreen);
