const path =require('path')

module.exports={
    publicPath:'/public', //admin public
    assetsDir:'public',
    outputDir:path.join(__dirname,'../src/public'),
    indexPath:'index.html',
    devServer:{
        proxy:{
            '/':{
                target:'http://localhost:3000',
                // pathRewrite:{
                //     '^/api':'/'
                // }
            }
        }
    }
}