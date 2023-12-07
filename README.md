# Laurenzano Lab4 - Clínica Online

## Descripción general de la aplicación

### La clínica
La Clínica OnLine, especialista en salud, cuenta actualmente con consultorios, laboratorios y una sala de espera general.
Disponemos de profesionales de distintas especialidades. Se pueden solicitar turnos de acuerdo a su disponibilidad.

### Horarios
Está abierta al público de lunes a viernes en el horario de 8:00 a 19:00, y los sábados en el horario de 8:00 a 14:00.


## Uso de la Web de la clínica

### Ingreso

Para usar nuestro sitio web es necesario disponer de un usuario.
Si ya tiene un usuario registrado, solo debe acceder a la sección **Ingreso** y completar el formulario con su dirección de email y contraseña.
Si es la primera vez que ingresa al portal, necesita crear un usuario, desde la sección **Registro**. Una vez que complete el formulario recibirá un mensaje en su casilla de email, con un link para verificación. Después de seguir el link, su usuario estará habilitado para ingresar al sistema.
Para el caso de los especialistas que crean un nuevo usuario, además de estos pasos, deben esperar a que el área de Administración los habilite a ingresar.

---pegar imágenes acá---



Pantallas:

Mis Turnos
-	Como PACIENTE
	-	Solo tendrá acceso el Paciente y le mostrará los turnos que él solicitó.

	-	Esta sección deberá contar con un filtro único donde podrá filtrar por:
		-	Especialidad
		-	Especialista
		-	NO UTILIZAR Combobox
	-	A su vez desde este listado podrá realizar las siguientes acciones:
		-	Cancelar turno
			-	Solamente debe ser visible si el turno no fue realizado.
			-	Debe dejar un comentario del porque se cancela el turno.
		-	Ver reseña.
			-	Solo debe ser visible si el turno tiene un comentario o reseña cargado.
		-	Completar encuesta.
			-	Solamente debe estar visible si el especialista marcó el turno como realizado y dejo la reseña.
		-	Calificar Atención
			-	Solamente debe ser visible una vez que el turno sea realizado.
			-	El paciente debe dejar un comentario de como fue la atención del Especialista.

	-	Debe estar bien visible el estado del turno.

	-	Solamente mostrar la acción que puede realizar el usuario.

-	Como ESPECIALISTA
	-	Solo tendrá acceso el Especialista y le mostrará los turnos que tiene asignados.

	-	Esta sección deberá contar con un filtro único donde podrá filtrar por:
		-	Especialidad
		-	Paciente
		-	NO UTILIZAR Combobox

	-	A su vez desde este listado podrá realizar las siguientes acciones:
		-	Cancelar turno
			-	Solamente debe ser visible si el turno no fue Aceptado, Realizado o Rechazado.
			-	Para cancelar el turno se debe dejar un comentario del porque se cancela el mismo.
		-	Rechazar turno
			-	Solamente debe ser visible si el turno no fue Aceptado, Realizado o Cancelado.
			-	Para rechazar el turno se debe dejar un comentario del porque se rechaza el mismo.
		-	Aceptar turno
			.	Solamente debe ser visible si el turno no fue Realizado, Cancelado o Rechazado.
		-	Finalizar Turno
			-	Solamente debe ser visible si el turno fue Aceptado.
			-	Para finalizar el turno se debe dejar una reseña o comentario de la consulta y diagnóstico realizado.
		-	Ver Reseña
			-	Solo debe ser visible si el turno tiene un comentario o reseña cargado.

	-	Debe estar bien visible el estado del turno.

	-	Solamente mostrar la acción que puede realizar el usuario.


Turnos
-	Solo tendrá acceso el Administrador y le mostrará los turnos de la clínica.

-	Esta sección deberá contar con un filtro único donde podrá filtrar por:○
	-	Especialidad
	-	Especialista
	-	NO UTILIZAR Combobox

-	A su vez desde este listado podrá realizar las siguientes acciones:
	-	Cancelar turno
		-	Solamente debe ser visible si el turno no fue Aceptado, Realizado o Rechazado.
		-	Para cancelar el turno se debe dejar un comentario del porque se cancela el mismo.
	-	Solicitar Turno
		-	En esta sección tendrán acceso tanto el Paciente como el Administrador y permitirá realizar la carga de un turno.
		-	Se deberá seleccionar:
			-	Especialidad
			-	Especialista
			-	Día y horario del turno.
				-	El paciente debe tener la posibilidad de elegir turno dentro de los próximos 15 días.
				-	Estas fechas tienen que estar relacionadas al especialista seleccionado y su disponibilidad horaria.
				-	NO UTILIZAR Datepicker
			-	En el caso del administrador, deberá marcar el Paciente.


Mi perfil
-	Datos del usuario. Nombre, Apellido, Imágenes, etc.

-	Mis horarios
	-	Solamente los usuario con perfil Especialista
	-	En esta sección el Especialista deberá marcar su disponibilidad horaria. Tener en cuenta que el Especialista puede tener más de una especialidad asociada.