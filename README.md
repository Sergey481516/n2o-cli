# n2o-cli
A CLI to bootstrap n2o project and generate custom components
 
 ## Installation
 
```bash
npm i -g n2o-cli
```

### Usage
```
n2o-cli [command]

Commands:

Init new project: n2o-cli init [--repository=path] [name] [--repository]
Creator usage: n2o-cli create:[customization point] [options]
Generator usage: n2o-cli generate:[generator point] [name] [path]

Customization`s points: [widget, cell, control, field, fieldset, region, snippet]
Generator`s points: [test, story, cosmos]

Options:
    --repository - user repository to clone n2o-boilerplate
    -h, --help
    -s, --story - create storybook template with file
    -c, --cosmos - create cosmos template with file
    -t, --test - create test file with file
```
