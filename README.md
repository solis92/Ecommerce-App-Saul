# Notas

ejecutar el query sql
contiene los Store Procedure


Requerimientos

ANGULAR 19
Visual Studio Code
Visual Studio 2022 con .net 8
SSMS con SQL Server Express

descargar WebAPI se abre el proyecto y ejecutar con F5

esta es standalone, para el JWT se usaron el email  userid como secret

para ejecutar los SP se usa FromSQLInterpolate, aunque algunas consultas sencillas usan LINQ Lambda

Se agregaron data annotations para validar los modelos

todo va dentro del dbcontext, para que se pueda ejecutar un solo contexto y eviitar los sql param

se usa un patron MVC, donde el controlador recibe segun el verbo

Product por ejemplo devuelve una lista

mientras que el id, filtra por producto, ninguna API puede ejecutarse sin haber agregado un token Bearer

solo la de Login Login y Acceso Register

por obvias razones, estas no requierern el JWT para poder iniciar sesion y devolver el token

de lado del Front se necesita instalar las dependencias, para posterior usar ng serve -obvias

se implementa material para poder tener los css asi como las clases para login, register y home, el home

valida que tengas un token en caso de no, redirecciona al login. De igual forma los formularios evitan que 

hagas click sin haber llenado previamente.

en el folder de services esta el Authentificador, ahi se postearon las API, es importante que el proyecto

WebAPI este ejecutandose antes del de Angular, de otra forma no podra crear cuentas nuevas para loggearse

de igual forma, se puede ver la logica de las consultas usando http se pueden invocar todos los metodos de
un RESTAPI, solo use un patch para un metodo, la idea era que luego de insertar el detalle de una orden
ejecutar ese update, y mediante un SP recalcular el total, usando los subtotales que estan en el detalle

GET, POST, PATCH se envia como parametro el token obtenido del localstorage, es una variable tokenBearer

en un punto al llegar al home, se busco que al visitar dicha pagina, se crea en automatico una orden
pero se decripto el bearertoken, se llama decode, la intencion fue recuperar el userid, sin exponer ese parametro
esta en home.ts

Intente avanzar mas en el front, pero hoy es la fecha limite, y hasta aqui pude llegar, estoy en otros procesos
Agradezco haber leido hasta este punto y espero que la logica implementada en el Backend asi como el FrontEnd 
sea de su agrado.

Puntos a mejorar el BearerToken si caduca, pero no hay un watcher que valide continuamente, dandose el caso de 
que a menos que se vuelva a loggear, bearerToken sigue almacenado en la memoria del navegador