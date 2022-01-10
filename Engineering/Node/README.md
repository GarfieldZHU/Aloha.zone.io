# Node.JS Project Engineering

The important frontend/nodejs projects' engineering knowledge.

## PNPM vs. Yarn/npm

[PNPM](https://pnpm.io/) is a **fast**, **disk space efficient** package manager, which works as counterpart of [Yarn](https://yarnpkg.com/) and NPM.

It aims to resolve the historic problems [phantom dependencies](https://rushjs.io/pages/advanced/phantom_deps/) and [NPM doppelgangers](https://rushjs.io/pages/advanced/npm_doppelgangers/) in node_modules. And it makes better time and space efficiency of node_modules.


### Dependency graph

In project management, the dependency graph is typical a [Directed Acyclic Graph](https://en.wikipedia.org/wiki/Directed_acyclic_graph) (aka DAG).

#### NodeJS special rule

NodeJS represents this graph physically on disk via file system. The tree could not represents the DAG well, so it introduces a [special resolution rule](https://nodejs.org/api/modules.html#modules_all_together) to help it with overheads of extra edges. It is what we called **phantom dependencies**.



