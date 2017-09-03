var MongoClient = require('mongodb');
var mongoose = require('mongoose');
var db = mongoose.createConnection("mongodb://localhost:27017/ozledgrowlights")
var shopify = require('shopify-buy');
// var _ = require('underscore')
var client = shopify.buildClient({
    accessToken: '2316d72d137b62d7f172bd87762b9fe3',
    domain: 'ozledgrowlights.myshopify.com',
    appId: '6'
});

module.exports = function(vars) {
    var model = vars.model
    var type = vars.type
    model.then(productModel => {

        client
            .fetchAllProducts()
            .then((products) => {
                console.log("looping through all products")
                var productIds = []
                products.forEach((ProductIter, index) => {
                    var productIter1 = ProductIter
                    productIds.push(productIter1.attrs.product_id)
                })
                productModel.remove({
                        shopifyId: { $nin: productIds },
                        type: type
                    }).then((res, err) => {
                        if (err) {
                            console.error("there was an error deleting all documents that are of type: " + type + " and do not have an id in our list of shopify id's")
                        } else {
                            console.log("successfully removed all products which do not have id in our list of shopify id's and have the correct type")
                        }
                    })
                    .catch(err => {
                        console.error("there was an error deleting all documents that are of type: " + type + " and do not have an id in our list of shopify id's")
                        console.error(err)
                    })
                products.forEach((productIter, index) => {
                    var product = productIter
                    productModel.findOne({
                            shopifyProductId: product.id
                        }).then((ReturnedProduct, err) => {
                            if (!err) {
                                var returnedProduct = ReturnedProduct

                                if (product.attrs.product_type == type) {
                                    var json = product
                                        .attrs
                                        .body_html
                                        .split('|||')[1]
                                    product.attrs.body_html = product
                                        .attrs
                                        .body_html
                                        .split('|||')[0]
                                    var productData = {}
                                    if (json) {
                                        json = json.replace(/(<.{0,1}span>|<meta.*">|<.{0,1}p>|\r?\n|\r|\s)/g, '')
                                            // console.log(json)
                                        json = JSON.parse(json)
                                        var productData = json
                                        delete product.attrs.variants[0].title
                                        jsonConcat(product.attrs, product.attrs.variants[0])
                                        productData.shopifyVariantId = product.attrs.id
                                        productData.shopifyProductId = product.attrs.product_id
                                        delete product.attrs.id
                                        delete product.attrs.product_id
                                        jsonConcat(productData, product.attrs)
                                        var newProduct = new productModel(productData)
                                    } else {
                                        delete product.attrs.variants[0].title
                                        jsonConcat(product.attrs, product.attrs.variants[0])
                                        productData.shopifyVariantId = product.attrs.id
                                        productData.shopifyProductId = product.attrs.product_id
                                        delete product.attrs.id
                                        delete product.attrs.product_id
                                        jsonConcat(productData, product.attrs)
                                        var newProduct = new productModel(productData)
                                    }
                                    // if (!JSONequal(product, newProduct)) {
                                    productModel.remove({
                                            shopifyProductId: newProduct.shopifyProductId
                                        }).then((res, err) => {
                                            if (err) {
                                                console.log("there was an error removing all products from our database: ")
                                                    // console.log(err)
                                                console.log("and res")
                                                    // console.log(res)

                                            } else if (res) {
                                                newProduct.save(err => {
                                                    if (err) {
                                                        console.log("there was an error saving the model to the database: ")
                                                        console.log(err)
                                                    } else {
                                                        console.log("saved the model succesfully")
                                                    }
                                                })
                                            }
                                        })
                                        .catch(err => {
                                            console.error("there was an error removing product from database with id: " + product.product_id)
                                            console.error(err)
                                        })
                                        // } else {
                                        //     console.log("the product we fetched has the same data as the one in our database, we don't need to store it or delete it")
                                        // }
                                }
                                if (products.length == index - 1) {
                                    return
                                }


                            } else {
                                console.error("there was an error finding a product with id: " + product.id)
                                console.error(err)
                            }

                        })
                        .catch(err => {
                            console.error("there was na error finding a product with id: " + product.id)
                            console.error(err)
                        })
                })
            })
            .catch(err => {
                console.error("there was an error when fetching all products from your shopify store")
                console.error(err)
            })


    }).catch(err => {
        console.log("there was some error waiting on the product model: ")
        console.log(err)
    })
}

function JSONequal(o1, o2) {
    console.log("what")
    var same
    for (var key in o2) {
        console.log(typeof(o2[key]))
        if (typeof(o2[key]) == 'string') {
            console.log("the property was a string")
        }

        if (typeof(o2[key]) == 'string' || 'number' || 'boolean') {
            if (o1[key] == o2[key]) {
                console.log("the properties were equal")
                same = true
            } else {
                same = false
            }

        }
        if (!same) {
            return false

        }
    }
}

function jsonConcat(o1, o2) {
    for (var key in o2) {
        o1[key] = o2[key];
    }
}