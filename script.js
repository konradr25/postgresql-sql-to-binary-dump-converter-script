#!/usr/bin/env node
var SHELLJS = require('shelljs');

var FILE_NAME = 'dump.gz';
var DB_NAME = "temp";
var USERNAME = '';
var PGPASSWORD = 'pass';
var ZIP_EXE="C:\\\"Program Files\"\\7-Zip\\7z.exe";
var PSQL_EXE="C:\\\"Program Files\"\\PostgreSQL\\9.5\\bin\\";


SHELLJS.exec("set PGPASSWORD="+PGPASSWORD, {async:false} );
var command = PSQL_EXE + 'psql -U postgres -c "CREATE DATABASE '+DB_NAME+'"';
var filenameWithoutExtension = FILE_NAME.slice(0, -3)
SHELLJS.exec(command, {async:false});
SHELLJS.exec(ZIP_EXE + ' e ' + FILE_NAME, {async:false});

var commandCreateDB = PSQL_EXE + 'psql -U postgres '+DB_NAME+' < ' + filenameWithoutExtension + ' > NUL';
SHELLJS.exec(commandCreateDB, {async:false});

var commandBackupDB = PSQL_EXE + 'pg_dump -U postgres -Fc '+DB_NAME+' > '+filenameWithoutExtension+'.bak';
SHELLJS.exec(commandBackupDB, {async:false});

