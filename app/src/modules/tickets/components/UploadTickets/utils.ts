// Utilidades para el componente UploadTickets

/**
 * Obtiene la extensión del archivo
 * @param fileName Nombre del archivo
 * @returns Extensión del archivo en mayúsculas
 */
export const getFileExtension = (fileName: string): string => {
  const extension = fileName.split(".").pop()?.toLowerCase() || "";
  return extension.toUpperCase();
};

/**
 * Obtiene el icono correspondiente según la extensión del archivo
 * @param fileName Nombre del archivo
 * @returns Nombre del icono de Material Design Icons
 */
export const getFileIcon = (fileName: string): string => {
  const extension = fileName.split(".").pop()?.toLowerCase();

  switch (extension) {
    case "csv":
      return "mdi-file-table-outline";
    case "xls":
    case "xlsx":
      return "mdi-microsoft-excel";
    case "pdf":
      return "mdi-file-pdf-box";
    case "doc":
    case "docx":
      return "mdi-microsoft-word";
    case "jpg":
    case "jpeg":
    case "png":
      return "mdi-file-image-outline";
    case "zip":
    case "rar":
      return "mdi-zip-box-outline";
    case "txt":
      return "mdi-file-document-outline";
    case "ppt":
    case "pptx":
      return "mdi-microsoft-powerpoint";
    case "mp3":
    case "wav":
      return "mdi-file-music-outline";
    case "mp4":
    case "avi":
    case "mov":
      return "mdi-file-video-outline";
    default:
      return "mdi-file-outline";
  }
};

/**
 * Obtiene el color del icono según la extensión del archivo
 * @param fileName Nombre del archivo
 * @returns Color para el icono
 */
export const getFileIconColor = (fileName: string): string => {
  const extension = fileName.split(".").pop()?.toLowerCase();

  switch (extension) {
    case "csv":
      return "green";
    case "xls":
    case "xlsx":
      return "green-darken-2";
    case "pdf":
      return "red";
    case "doc":
    case "docx":
      return "blue";
    case "jpg":
    case "jpeg":
    case "png":
      return "purple";
    case "zip":
    case "rar":
      return "amber-darken-2";
    case "txt":
      return "grey-darken-1";
    case "ppt":
    case "pptx":
      return "deep-orange";
    case "mp3":
    case "wav":
      return "cyan-darken-2";
    case "mp4":
    case "avi":
    case "mov":
      return "indigo";
    default:
      return "grey";
  }
};

/**
 * Formatea el tamaño del archivo a una forma legible
 * @param bytes Tamaño en bytes
 * @returns Tamaño formateado
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

/**
 * Verifica si el tipo de archivo es aceptado
 * @param file Archivo a verificar
 * @param acceptedFiles String con los tipos de archivos aceptados
 * @returns true si el archivo es aceptado, false en caso contrario
 */
export const isFileTypeAccepted = (
  file: File,
  acceptedFiles: string
): boolean => {
  if (!acceptedFiles) return true;

  const fileType = file.type;
  const fileName = file.name;
  const fileExtension = fileName.split(".").pop()?.toLowerCase();

  // Convertir la cadena de aceptación a un array de tipos aceptados
  const acceptedTypes = acceptedFiles
    .split(",")
    .map((type) => type.trim().toLowerCase());

  return acceptedTypes.some((acceptedType) => {
    // Si es un tipo MIME
    if (acceptedType.includes("/")) {
      return fileType === acceptedType;
    }
    // Si es una extensión (comienza con punto)
    else {
      const ext = acceptedType.startsWith(".")
        ? acceptedType
        : `.${acceptedType}`;
      return `.${fileExtension}` === ext;
    }
  });
};
