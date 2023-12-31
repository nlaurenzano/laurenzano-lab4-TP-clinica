# Laurenzano Lab4 - Clínica Online
## Descripción general de la aplicación
### La clínica
La Clínica OnLine, especialista en salud, cuenta actualmente con consultorios, laboratorios y una sala de espera general.
Disponemos de profesionales de distintas especialidades. Se pueden solicitar turnos de acuerdo a su disponibilidad.

![Inicio](https://github.com/nlaurenzano/laurenzano-lab4-TP-clinica/assets/21069517/d0c60ecc-6cc8-4848-8cad-4e90a2fb41bc)

### Horarios
Está abierta al público de lunes a viernes en el horario de 8:00 a 19:00, y los sábados en el horario de 8:00 a 14:00.

## Uso de la Web de la clínica
### Ingreso
Para usar nuestro sitio web es necesario disponer de un usuario.
Si ya tiene un usuario registrado, solo debe acceder a la sección **Ingreso** y completar el formulario con su dirección de email y contraseña.
Si es la primera vez que ingresa al portal, necesita crear un usuario, desde la sección **Registro**. Una vez que complete el formulario recibirá un mensaje en su casilla de email, con un link para verificación. Después de seguir el link, su usuario estará habilitado para ingresar al sistema.
Para el caso de los especialistas que crean un nuevo usuario, además de estos pasos, deben esperar a que el área de Administración los habilite a ingresar.

![Navegación inicial](https://github.com/nlaurenzano/laurenzano-lab4-TP-clinica/assets/21069517/ee2a4ff2-6704-49d7-82c9-d56591c06280)

![Formulario de ingreso](https://github.com/nlaurenzano/laurenzano-lab4-TP-clinica/assets/21069517/497377a9-d89f-4660-a273-44c6a89e7cb3)

![Formulario de registro - Parte 1](https://github.com/nlaurenzano/laurenzano-lab4-TP-clinica/assets/21069517/eb9fe8e6-350d-4199-8be0-2c0f5caed137)

![Formulario de registro - Parte 2](https://github.com/nlaurenzano/laurenzano-lab4-TP-clinica/assets/21069517/d2b3aa07-93f1-4be3-93d2-a8fa03d74c54)

### Pacientes
Los pacientes pueden acceder a las siguientes secciones de la Web:
-	Perfil.
-	Mis Turnos.
-	Nuevo Turno.

#### Perfil
En esta sección se ven los datos del usuario y sus imágenes.
Además se puede seleccionar una especialidad, para ver los turnos pasados y acceder a la historia clínica. Se puede descargar la historia clínica en formato PDF.

![image](https://github.com/nlaurenzano/laurenzano-lab4-TP-clinica/assets/21069517/3e4574e4-173c-4981-9742-91f4874abbe9)

![image](https://github.com/nlaurenzano/laurenzano-lab4-TP-clinica/assets/21069517/b4971444-75c6-442f-acdc-1371785fd549)

![image](https://github.com/nlaurenzano/laurenzano-lab4-TP-clinica/assets/21069517/11401ab8-ed30-4113-858a-7c23ab0489cb)


#### Mis Turnos
En esta sección se ven todos los turnos que el usuario haya solicitado, con su horario y estado.
A la izquierda del listado se encuetra la opción **Filtrar** los turnos visibles. Al usar esta opción, se selecciona la especialidad que se está buscando y luego el especialista. Para volver a ver todos los turnos, usar la opción **Limpiar Filtros**.
Al seleccionar un turno, se puede ver en detalle toda la información relacionada, como el especialista y especialidad, estado del turno, comentarios, encuesta y calificación. En esta sección del detalle se habilitan las acciones que se puedan tomar sobre el turno. El paciente puede cancelar un turno, completar una encuesta y calificar la atención.

![Turnos - Paciente](https://github.com/nlaurenzano/laurenzano-lab4-TP-clinica/assets/21069517/5eb05452-e31e-4c67-b32a-c6c682f9a398)

![Filtrar - Selección de especialidad](https://github.com/nlaurenzano/laurenzano-lab4-TP-clinica/assets/21069517/2f658607-1f45-457c-9103-dec7cfaba204)

![Filtrar - Selección de especialista](https://github.com/nlaurenzano/laurenzano-lab4-TP-clinica/assets/21069517/dd49ab57-6b4d-41a0-863d-9a657a4a4a1d)

#### Nuevo Turno
En esta sección se puede solicitar un turno.
Primero debe seleccionarse el especialista que se está buscando, luego indicar la especialidad y, por último, el día y horario deseados. Los turnos que no estén disponibles se verán en un tono más suave y no podrán seleccionarse. Cabe aclarar que la confirmación del turno depende de que el especialista acepte el horario propuesto.
Se puede ver el estado de los turnos solicitados en la sección **Mis Turnos**.

![Nuevo turno - Selección de especialista](https://github.com/nlaurenzano/laurenzano-lab4-TP-clinica/assets/21069517/8ca7079d-77c5-446e-8cb3-ef174025ad75)

![Nuevo turno - Selección de especialidad](https://github.com/nlaurenzano/laurenzano-lab4-TP-clinica/assets/21069517/33ea97ef-6913-4bb2-9008-9d2fb364706e)

![Nuevo turno - Selección de horario](https://github.com/nlaurenzano/laurenzano-lab4-TP-clinica/assets/21069517/6388f3be-4398-4213-99c5-233a1597b751)

### Especialistas
Los especialistas pueden acceder a las siguientes secciones de la Web:
-	Perfil.
-	Mis Turnos.

#### Perfil
En esta sección se ven los datos del usuario, su imagen y las especialidades en las que trabaja.
Los especialistas además tienen la opción de definir el horario y la duración de los turnos para cada especialidad. Para eso solo deben seleccionar la especialidad en el listado y configurar los datos. Al usar la opción **Salir**, los datos serán guardados en el sistema.
Esta configuración solo afecta a los turnos nuevos, no a los existentes.

![Perfil - Especialista](https://github.com/nlaurenzano/laurenzano-lab4-TP-clinica/assets/21069517/cbd51548-ac2c-4d23-b592-a9dd8a0c8c00)

![Configuración de horarios y duración de turnos](https://github.com/nlaurenzano/laurenzano-lab4-TP-clinica/assets/21069517/7ddce981-5783-4fb9-b288-5b179604a228)


#### Pacientes
En esta sección se ven todos los pacientes que el especialista haya atendido al menos una vez.
Al seleccionar un paciente, se puede ver en detalle toda la información relacionada, junto con sus imágenes de perfil y los últimos turnos a los que asistió. En el listado de turnos se puede acceder a la historia clínica asociada.

![Pacientes](https://github.com/nlaurenzano/laurenzano-lab4-TP-clinica/assets/21069517/575e1188-f604-4f13-b36f-88f599bbdc62)

![Historia clínica](https://github.com/nlaurenzano/laurenzano-lab4-TP-clinica/assets/21069517/39f3083b-d637-4d24-bf44-5855428f9847)


#### Mis Turnos
En esta sección se ven todos los turnos que los pacientes hayan solicitado con el especialista, con su horario y estado.
A la izquierda del listado se encuetra la opción **Filtrar** los turnos visibles. Al usar esta opción, se selecciona la especialidad que se está buscando y luego el paciente. Para volver a ver todos los turnos, usar la opción **Limpiar Filtros**.
Al seleccionar un turno, se puede ver en detalle toda la información relacionada, como el especialista y especialidad, el nombre del paciente, estado del turno, comentarios, encuesta y calificación. En esta sección del detalle se habilitan las acciones que se puedan tomar sobre el turno. El especialista puede cancelar, aceptar, rechazar o finalizar un turno y agregar un comentario.

![image](https://github.com/nlaurenzano/laurenzano-lab4-TP-clinica/assets/21069517/ea1cea94-0aa0-4943-89f0-f38d5e0fdc32)

![Filtrar - Selección de especialidad](https://github.com/nlaurenzano/laurenzano-lab4-TP-clinica/assets/21069517/d40f9a4a-6f64-4d8c-aa90-ed2361e07fe9)

![Filtrar - Selección de paciente](https://github.com/nlaurenzano/laurenzano-lab4-TP-clinica/assets/21069517/ed3b37c4-eb5d-4f5a-a354-eedcd4ae0bf6)

### Administradores
Los administradores pueden acceder a las siguientes secciones de la Web:
-	Perfil.
-	Usuarios.
-	Turnos.
-	Nuevo Turno.

#### Perfil
En esta sección se ven los datos del usuario y su imagen.

#### Usuarios
En esta sección se ven todos los usuarios registrados en la Web y se permite la creación de usuarios nuevos.
Para crear un nuevo usuario se usa la acción **Nuevo Usuario**, que está debajo del título. Esto nos lleva al formulario de registro, con la opción adicional de crear un nuevo usuario Administrador.
A la izquierda del listado se encuetra la opción **Filtrar** los usuarios visibles. Simplemente se selecciona el tipo de usuario que se está buscando (paciente, especialista o administrador). Para volver a ver todos los usuarios, usar la opción **Limpiar Filtros**.
En el listado también están disponibles las acciones **Habilitar** y **Deshabilitar**, para controlar el acceso de los usuarios especialistas.
Al seleccionar un usuario, se puede ver en detalle toda la información relacionada, junto con sus imágenes de perfil.

![Listado de usuarios](https://github.com/nlaurenzano/laurenzano-lab4-TP-clinica/assets/21069517/c30c5ab1-61a2-4487-824f-01493c282b56)

![Listado de especialistas](https://github.com/nlaurenzano/laurenzano-lab4-TP-clinica/assets/21069517/8abe2291-1a5a-44d6-896a-5904c6c4175b)

![Creación de nuevo usuario](https://github.com/nlaurenzano/laurenzano-lab4-TP-clinica/assets/21069517/6209869c-1df5-4ad8-84c0-5b43fbbf613b)


#### Informes
En esta sección se accede a los informes de uso de la Web
Los informes disponibles son:
-	Log de ingresos al sistema: Es un listado que indica cada actividad de los usuario, con día y horario.
	Este informe se puede exportar en formato PDF.
-	Cantidad de turnos por especialidad.
-	Cantidad de turnos por día.
-	Cantidad de turnos solicitado por médico, desde el día actual hasta 15 días en adelante.
-	Cantidad de turnos finalizados por médico, desde 30 días atrás hasta el día actual.

![image](https://github.com/nlaurenzano/laurenzano-lab4-TP-clinica/assets/21069517/3c30d158-544f-4eff-be85-5174297dce43)

![image](https://github.com/nlaurenzano/laurenzano-lab4-TP-clinica/assets/21069517/99a26b02-e32f-4e46-af1d-753bf5336a15)

![image](https://github.com/nlaurenzano/laurenzano-lab4-TP-clinica/assets/21069517/f3aeaaa4-ba30-4eae-a6d7-76080540ec45)

![image](https://github.com/nlaurenzano/laurenzano-lab4-TP-clinica/assets/21069517/04280255-fb55-48c8-9478-1b51116e2c5a)

![image](https://github.com/nlaurenzano/laurenzano-lab4-TP-clinica/assets/21069517/da486884-46b0-4679-8a30-aff70647f829)


#### Turnos
En esta sección se ven todos los turnos que los usuarios hayan solicitado, con su horario y estado.
A la izquierda del listado se encuetra la opción **Filtrar** los turnos visibles. Al usar esta opción, se selecciona la especialidad que se está buscando y luego el especialista. Para volver a ver todos los turnos, usar la opción **Limpiar Filtros**.
Al seleccionar un turno, se puede ver en detalle toda la información relacionada, como el especialista y especialidad, estado del turno, comentarios, encuesta y calificación. En esta sección del detalle se habilitan las acciones que se puedan tomar sobre el turno. El administrador puede cancelar un turno.

![Listado de turnos](https://github.com/nlaurenzano/laurenzano-lab4-TP-clinica/assets/21069517/f4dce730-9fce-48fa-91cc-116478c02219)

#### Nuevo Turno
En esta sección se puede solicitar un turno.
Primero debe seleccionarse el paciente que se está buscando, luego indicar el especialista, la especialidad y, por último, el día y horario deseados. Los turnos que no estén disponibles se verán en un tono más suave y no podrán seleccionarse. Cabe aclarar que la confirmación del turno depende de que el especialista acepte el horario propuesto.
Se puede ver el estado de los turnos solicitados en la sección **Turnos**.
![Nuevo turno - Selección de paciente](https://github.com/nlaurenzano/laurenzano-lab4-TP-clinica/assets/21069517/73886605-9288-48c1-aedb-f6b495b1946a)
