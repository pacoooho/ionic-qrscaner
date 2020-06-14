
paco@paco-K52JT:~/Documentos/ionic curso/sección 10/06-rscaner$ jarsigner -verbose -sigalg SHA1withRSA -diges
talg SHA1 -keystore my-release-key.keystore HelloWorld-release-unsigned.apk alias_name
Enter Passphrase for keystore: 
jarsigner error: java.lang.RuntimeException: keystore load: /home/paco/Documentos/ionic curso/sección 10/06-qrscaner/my-release-key.keystore (No existe el archivo o el directorio)
paco@paco-K52JT:~/Documentos/ionic curso/sección 10/06-rscaner$ keytool -genkey -v -keystore my-release-key.k
eystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000
Introduzca la contraseña del almacén de claves:  
La contraseña del almacén de claves es demasiado corta, debe tener al menos 6 caracteres
Introduzca la contraseña del almacén de claves:  
Volver a escribir la contraseña nueva: 
¿Cuáles son su nombre y su apellido?
  [Unknown]:  Francisco Muñoz
¿Cuál es el nombre de su unidad de organización?
  [Unknown]:  
¿Cuál es el nombre de su organización?
  [Unknown]:  
¿Cuál es el nombre de su ciudad o localidad?
  [Unknown]:  barcelona
¿Cuál es el nombre de su estado o provincia?
  [Unknown]:  barcelona
¿Cuál es el código de país de dos letras de la unidad?
  [Unknown]:  34  
¿Es correcto CN=Francisco Muñoz, OU=Unknown, O=Unknown, L=barcelona, ST=barcelona, C=34?
  [no]:  s

Generando par de claves RSA de 2.048 bits para certificado autofirmado (SHA256withRSA) con una validez de 10.000 días
        para: CN=Francisco Muñoz, OU=Unknown, O=Unknown, L=barcelona, ST=barcelona, C=34
Introduzca la contraseña de clave para <alias_name>
        (INTRO si es la misma contraseña que la del almacén de claves):  
[Almacenando my-release-key.keystore]

Warning:
El almacén de claves JKS utiliza un formato propietario. Se recomienda migrar a PKCS12, que es un formato estándar del sector que utiliza "keytool -importkeystore -srckeystore my-release-key.keystore -destkeystore my-release-key.keystore -deststoretype pkcs12".