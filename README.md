# todoMiniBackend
Backend APIs which provides endpoints to manage todos and tags.

## Project Setup:

- Clone the project in a directory of your choice.
- Go the directory by running the command
    -     cd todoMiniBackend
- Install the required packages while in the root-directory of the project by running the below mentioned command in the terminal".
    -     npm install express
    -     npm install mongoose
    -     npm install cors
- Configure the database:
    -     Edit the file todoMiniBackend/models/tag.js line 4 with your username, password and database cluster name. (mongoose.connect('mongodb+srv://Enter_Your_UserName:Enter_Your_Password@Enter_Your_Database_Cluster_Name');)
    -     Edit the file todoMiniBackend/models/todo.js line 4 with your username, password and database cluster name. (mongoose.connect('mongodb+srv://Enter_Your_UserName:Enter_Your_Password@Enter_Your_Database_Cluster_Name');)

- Once setup is done you'll see the below project layout.

## Project Layout:
<pre>
todoMiniBackend
├── README.md
├── Server.js
├── models
│   ├── tag.js
│   └── todo.js
├── node_modules
│   ├── @mongodb-js
│   ├── @types
│   ├── accepts
│   ├── array-flatten
│   ├── body-parser
│   ├── bson
│   ├── bytes
│   ├── call-bind
│   ├── content-disposition
│   ├── content-type
│   ├── cookie
│   ├── cookie-signature
│   ├── cors
│   ├── debug
│   ├── define-data-property
│   ├── depd
│   ├── destroy
│   ├── ee-first
│   ├── encodeurl
│   ├── es-define-property
│   ├── es-errors
│   ├── escape-html
│   ├── etag
│   ├── express
│   ├── finalhandler
│   ├── forwarded
│   ├── fresh
│   ├── function-bind
│   ├── get-intrinsic
│   ├── gopd
│   ├── has-property-descriptors
│   ├── has-proto
│   ├── has-symbols
│   ├── hasown
│   ├── http-errors
│   ├── iconv-lite
│   ├── inherits
│   ├── ipaddr.js
│   ├── kareem
│   ├── media-typer
│   ├── memory-pager
│   ├── merge-descriptors
│   ├── methods
│   ├── mime
│   ├── mime-db
│   ├── mime-types
│   ├── mongodb
│   ├── mongodb-connection-string-url
│   ├── mongoose
│   ├── mpath
│   ├── mquery
│   ├── ms
│   ├── negotiator
│   ├── node
│   ├── node-bin-setup
│   ├── object-assign
│   ├── object-inspect
│   ├── on-finished
│   ├── parseurl
│   ├── path-to-regexp
│   ├── proxy-addr
│   ├── punycode
│   ├── qs
│   ├── range-parser
│   ├── raw-body
│   ├── safe-buffer
│   ├── safer-buffer
│   ├── send
│   ├── serve-static
│   ├── set-function-length
│   ├── setprototypeof
│   ├── side-channel
│   ├── sift
│   ├── sparse-bitfield
│   ├── statuses
│   ├── toidentifier
│   ├── tr46
│   ├── type-is
│   ├── unpipe
│   ├── utils-merge
│   ├── vary
│   ├── webidl-conversions
│   └── whatwg-url
├── package-lock.json
├── package.json
└── routes
    ├── tagRoutes.js
    └── todoRoutes.js
</pre>

## Bringing up the server:
- Run the below command
    -     node Server.js
