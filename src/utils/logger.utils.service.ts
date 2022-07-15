export class LoggerUtils {
  logController(methodAndUri: string, email: string, clientIP: string): string {
    return `${methodAndUri} : ${email} - Client Origin : [${clientIP}]`;
  }
}
