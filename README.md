# ghost-static-site-generator
A static site generator for generating static sites from [ghost](https://ghost.org/) blogs built using JS for generating a static site for ghost blogs. This is based loosely on [buster](https://github.com/axitkhurana/buster) but since that project has been abandonded I've decided to create a new tool. 

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

### Generate static site
```
$ gssg
```

### Generate static site from a custom domain
```
$ gssg --domain "http://localhost:2369"
```

### Generate static site to a custom folder
```
$ gssg --dest "myStaticSiteFolder"
```

## Contributing

This is still a work in progress, please feel free to contribute by raising issues or creating pr's.
