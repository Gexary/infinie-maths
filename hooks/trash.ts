// export default function useApiPrint(pdfUrl: string) {
//   const iframeRef = useRef<HTMLIFrameElement | null>(null);

//   useEffect(() => {
//     if (!pdfUrl) return;

//     const response = await fetch(apiUrl);
//     if (!response.ok) throw new Error("Erreur lors du fetch du PDF");

//     const blob = await response.blob();
//     const url = URL.createObjectURL(blob);

//     const iframe = createHiddenIframe(url);
//     iframeRef.current = iframe;

//     document.body.appendChild(iframe);

//     return () => {
//       URL.revokeObjectURL(url);
//       if (iframe.parentNode) iframe.parentNode.removeChild(iframe);
//       iframeRef.current = null;
//     };
//   }, [pdfUrl]);

//   const handlePrint = useCallback(() => {
//     const iframe = iframeRef.current;
//     if (!iframe?.contentWindow) return;

//     iframe.contentWindow.focus();
//     iframe.contentWindow.print();
//   }, []);

//   return handlePrint;
// }
