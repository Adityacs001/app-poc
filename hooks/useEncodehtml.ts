export default function useEncodeHTML(htmlstr) {
  var encodedStr = htmlstr.replace(/[\u00A0-\u9999<>\&]/g, function (i) {
    return "&#" + i.charCodeAt(0) + ";";
  });

  return { encodedStr };
}
