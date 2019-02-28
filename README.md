![Version](https://img.shields.io/badge/version-v1.0.0-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D%208.10.0-brightgreen.svg)
![License](https://img.shields.io/github/license/Fried-Chicken/ghost-static-site-generator.svg)
![Stars](https://img.shields.io/github/stars/Fried-Chicken/ghost-static-site-generator.svg)
![Forks](https://img.shields.io/github/forks/Fried-Chicken/ghost-static-site-generator.svg)
![Issues](https://img.shields.io/github/issues/Fried-Chicken/ghost-static-site-generator.svg)
# ghost-static-site-generator
A tool for generating static sites from [ghost](https://ghost.org/) blogs. This is based loosely on [buster](https://github.com/axitkhurana/buster) but since that project has been abandoned I've decided to create a new tool. 

There are many reasons for wanting to generate a static site. For example security benefits and speed. It's also possible to integrate this tool into a continuous integration process and deploy the generated site.

## Prerequisites
You need to have the following installed.
- Node v8 LTS
- wget v1.16 (Versions prior to will need to use the --silent flag as --show-progress is not available)

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

## Recipes
Assuming you are hosting locally on `http://localhost:2368` and your domain is `http://www.myblog.com` then you can run the following. You need to pass the url flag because all links need to be replaced with your domain name instead of localhost
```
$ gssg --url http://www.myblog.com
```

Assuming you are hosting remotely on `http://www.myhiddenserver.com:4538` and your domain is `http://www.myblogbucket.com` then you can run the following. You need to pass the url flag because all links need to be replaced with your domain name instead of localhost
```
$ gssg --domain http://www.myhiddenserver.com:4538 --url http://www.myblog.com
```

Assuming you are hosting remotely on `http://www.myhiddenserver.com:4538` and you want to pull into a separate folder instead of static you can use the following command
```
$ gssg --domain http://www.myhiddenserver.com:4538 --dest myblog-static-folder
```

## API 
### Generating a static site
This assumes that your site is running locally at `http://localhost:2368` and will output to a folder called static.
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
This will generated the site and then open the site in a new browser window. Please note: If you want to preview the site then the `--url` flag is ignored. This is because the links need to replace with the preview server's url.
```
$ gssg --preview
```

### Replace url
Use this flag to replace the url, use this option if your site url differs to your ghost url
```
$ gssg --url 'http://www.mydomain.com'
```

### Hosting a site in sub directories
Use this flag in conjunction with the `--dest` flag to host sites in directories. This flag will replace all relative path urls with absolute path urls
```
$ gssg --dest 'a-random-folder' --subDir 'a-random-folder'
```

### Silent mode
Use this flag to hide wget output
```
$ gssg --silent
```

### Fail on error
This option will output the failed wget command and also any errors to the stdout before exiting.
```
$ gssg --fail-on-error
```

### Ignore Absolute Paths
This option is intended for users who do no worry about SEO. This option will make your site truly relative and swap out all domain names for relative paths.
```
$ gssg --ignore-absolute-paths
```

## Contributing

This is still a work in progress, please feel free to contribute by raising issues or creating pr's.
