# fis-deploy-zip

## 使用

安装

```bash
npm i fis3-deploy-zip -g
```

配置fis-conf.js

```javascript
fis.media('zip').match('**', {
    deploy: [
        fis.plugin('zip', {
            zip: './output/output.zip'
        })
    ]
});
```

发布

```bash
fis3 release zip
```
