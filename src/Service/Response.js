export default function ApiResponse (status, message, data = null) {
  return {
    status,
    message,
    data
  };

}