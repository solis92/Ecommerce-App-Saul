CREATE DATABASE Examen;
USE Examen;

go

create table Usuario(
IdUsuario int primary key identity,
Nombre varchar(50),
Correo varchar(50),
Clave varchar(100)
)

go

create table Producto(
IdProducto int primary key identity,
Nombre varchar(50),
Marca varchar(50),
Precio decimal(10,2)
)

go

create table Orden(
IdOrden int primary key identity,
IdUsuario int,
Total decimal(10,2)
)

go

create table DetalleOrden(
IdOrdenDetalle int primary key identity,
IdOrden int,
IdProducto int,
Cantidad int,
Costo decimal(10,2),
SubTotal decimal(10,2)
)
go
insert into Producto
(Nombre,
Marca,
Precio)
values
(
'Huevo',
'Bachoco',
50
),
(
'Platanos',
'Banana Republic',
30
)
go
CREATE TABLE [dbo].[Orden](
	[IdOrden] int primary key identity,
	[IdUsuario] [int] NOT NULL,
	[Total] [decimal](10, 2) NULL,
)

go

CREATE TABLE [dbo].[DetalleOrden](
	[IdOrdenDetalle] int primary key identity,
	[IdOrden] [int] NOT NULL,
	[IdProducto] [int] NOT NULL,
	[Cantidad] [int] NOT NULL,
	[Costo] [decimal](10, 2) NOT NULL,
	[SubTotal] [decimal](10, 2) NOT NULL,
)
GO
CREATE PROCEDURE [dbo].[InsertOrder]
	   @IdUsuario int
AS 
BEGIN 
     SET NOCOUNT ON
INSERT INTO [dbo].[Orden]
           ([IdUsuario]
           ,[Total])
     VALUES
           (@IdUsuario
           ,0)
SELECT * FROM [dbo].[Orden] WHERE IdOrden=SCOPE_IDENTITY()
END


GO
CREATE PROCEDURE [dbo].[UpdateOrder]
	   @IdOrden int
AS 
BEGIN 
     SET NOCOUNT ON 

UPDATE [dbo].[Orden]
   SET [Total] = (select sum(Subtotal) from [DetalleOrden] where IdOrden=@IdOrden)
 WHERE [IdOrden]=@IdOrden
 SELECT * FROM [dbo].[Orden] WHERE IdOrden=@IdOrden
END 

GO

GO
CREATE PROCEDURE [dbo].[GetOrderDetails]
	   @IdOrden int
AS 
BEGIN 
     SET NOCOUNT ON 
 SELECT * FROM [dbo].[DetalleOrden] WHERE IdOrden=@IdOrden
END 

GO
CREATE PROCEDURE [dbo].[InsertOrderDetail]
	   @IdOrden int, 
       @IdProducto int,
	   @Cantidad int, 
       @Costo  decimal(10,2),  
	   @SubTotal decimal(10,2)
AS 
BEGIN 
     SET NOCOUNT ON
INSERT INTO [dbo].[DetalleOrden]
           ([IdOrden]
           ,[IdProducto]
           ,[Cantidad]
           ,[Costo]
           ,[SubTotal])
     VALUES
           (@IdOrden,
           @IdProducto,
           @Cantidad,
           @Costo,
           @SubTotal)
SELECT * FROM [dbo].[DetalleOrden] WHERE IdOrdenDetalle=SCOPE_IDENTITY()
END