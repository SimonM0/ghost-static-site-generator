# ghost-static-site-generator
A static site generator for generating static sites from [ghost](https://ghost.org/) blogs built using JS. This is based loosely on [buster](https://github.com/axitkhurana/buster) but since that project has been abandonded I've decided to create a new tool. 

There are many reasons for wanting to generate a static site. For example security. It's also possible to integrate this tool into a ci process and deploy the generated site.

## Prerequisites
You need to have the following installed.
- Node v8.9.0
- wget

## Installation
1. Install wget
```
$ brew install wget
```
2. Install globally the static site generator
```
$ npm install -g ghost-static-site-generator
```

## Usages

By default the tool will default to `http://localhost:2368` for the domain and generate a folder called `static` in the directory that you run the tool in.

## AMP Article images
For AMP article images you will need to add a dimension to it. Open `amp.hbs`, this is locaded at `versions/2.9.1/core/server/apps/amp/lib/views/amp.hbs` and edit the api-img line
```
<amp-img src="{{img_url feature_image absolute="true"}}" width="600" height="400" layout="responsive"></amp-img>
```
and add `size="m"` to the `img_url` helper
```
<amp-img src="{{img_url feature_image size="m" absolute="true"}}" width="600" height="400" layout="responsive"></amp-img>
```
### Generate static site
```
$ gssg
```

### Generate static site from a custom domain
If your site is not hosted locally you can use the `--domain` flag to target the your site.
```
$ gssg --domain "http://localhost:2369"
```

### Generate static site to a custom folder
To change the folder that the static site is generated into using the `--dest` flag.
```
$ gssg --dest "myStaticSiteFolder"
```

### Preview site
This will open the generated site in a new browser window.
```
$ gssg --preview
```

### Replace url
Use this flag to replace the url, use this option if your site url differs to your ghost url
```
$ gssg --url 'http://www.mydomain.com'
```

## Contributing

This is still a work in progress, please feel free to contribute by raising issues or creating pr's.
