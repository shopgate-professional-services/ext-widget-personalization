# Shopgate Connect - Engage personalization widget

Display user personalized information on CMS pages.

You can check [Demo](./demo/index.md)

## Settings

Widget settings have following values:

* media - (json) reach media to show as widget header
    * image (string) - url of image
    * href (string) - url of click action
* primary - (json) widget primary title
    * title (string) - primary title
    * text (string) - secondary title text
* supportingText - (string) widget supporting text
* actions - (object[]) widget actions, each action has a shape of
    * title (string) - action title
    * href (string) - url of click action

## Configure of widget

You can configure widget settings in [Shopgate Merchant admin](https://developer.shopgate.com/custom-widgets)

```html
<!--Widget
{
  "type": "@shopgate-project/widget-personalization/PersonalizationWidget",
  "settings": {
      "media": {
      "image": "https://picsum.photos/400/200",
      "href": "/category"
    },
    "primary": {
      "title": "Hello {firstName}",
      "text": "check out our new sale offers by your preferable size {customAttributes-size}"
    },
    "supportingText": "Supporting text include text like {customAttributes-middlename} of a user",
    "actions": [
      {
        "title": "Browse products",
        "href": "/category/sale"
      }
    ]
  }
}
-->
```


## Available user values

You can refer user data which are available for Engage.  
See [get User pipeline response](https://developer.shopgate.com/references/connect/shopgate-pipelines/user/shopgate.user.getuser.v1)

⚠ When using user `customAttributes`, you need to hyphenate a path to property, eg `customAttributes-size`

## Extension Configuration

Set the following value in your Shopgate Connect Admin:

* styles - (json) styles for widget elements [see anatomy of widget](./demo/anatomy.jpg)
    * card - (json) css rules for widget card
    * media - (json)
    * primaryTitle - (json)
    * primaryText - (json)
    * supportingText - (json)
    * actions - (json)
    * action - (json)

## Extension Configuration example
```json
{
  "styles": {
    "card": {
      "filter": "blur(3px)",
      "backdropFilter": "blur(3px)"
    },
    "media": {
      "height": "300px"
    },
    "primaryTitle": null,
    "primaryText": null,
    "supportingText": null,
    "actions": null,
    "action": null
  }
}
```

## About Shopgate

Shopgate is the leading mobile commerce platform.

Shopgate offers everything online retailers need to be successful in mobile. Our leading
software-as-a-service (SaaS) enables online stores to easily create, maintain and optimize native
apps and mobile websites for the iPhone, iPad, Android smartphones and tablets.
## License
See the [LICENSE](./LICENSE) file for more information.
