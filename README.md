## 🖥 Environment Support
- Modern browsers and Internet Explorer Edge
- Server-side Rendering

## 📦 Install

Design System can be installed by either NPM or Yarn, using the following command. You should also have `react@16.8.0`, `react-dom@16.8.0`, and `classnames@2.3.1` or higher versions.

```bash
yarn add --dev @starleaguecompany/react-utils
```

## 🔨 Usage

```jsx
import { useAnalytics } from '@starleaguecompany/react-utils';

const App = () => {
  const { pushEvent } = useAnalytics()

  const handleLinkClick = React.useCallback((event: React.MouseEvent<HTMLBaseElement>) => {
    const label = event.currentTarget.dataset.label || ''

    pushEvent({
      event: 'adEvent',
      eventCategory: 'Прочее',
      eventAction: 'Переход из меню',
      eventLabel: label,
    })

    event.preventDefault()
    return false
  }, [])

  return (
    <Link data-label="test" onClick={handleLinkClick}>PRESS ME</Link>
  )
}
```

### TypeScript

Design System is written in TypeScript with complete definitions.

## ⌨️ Development

Clone locally:

```bash
$ git clone git@github.com:starleaguecompany/package-react-utils.git
$ cd package-react-utils
$ yarn install
```

## 🤓 Scripts explained

Inside the `package.json` there are a bunch of scripts that this repo uses
to run the project in development and to build the project.

Below you can read a description of each script.

- `yarn dev`: Starts the development React Storybook.
- `yarn lint`: Lints the JavaScript files.
- `yarn test`: Runs the unit tests using `Jest`.
- `yarn format`: Runs formatters using `Prettier`.
- `yarn build`: Builds all the JavaScript files using `Babel`.
- `yarn release`: Releases new version.
- `yarn commit`: Runs gui for help to create correct commit.

## 🤝 Contributing

Read our [contributing guide](./CONTRIBUTING.md) and let's build a better Design System together.
