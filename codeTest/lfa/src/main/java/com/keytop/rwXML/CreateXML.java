package com.keytop.rwXML;

import org.w3c.dom.Document;
import org.w3c.dom.Element;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerConfigurationException;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import java.io.File;
import java.io.StringWriter;

/**
 * @author 廖福安（liaofuan@rd.keytop.com.cn）
 * @date 2016/5/9.
 */
public class CreateXML {

    public static void main(String[] args){
        try {
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance().newInstance();
            DocumentBuilder builder = factory.newDocumentBuilder();
            Document document = builder.newDocument();

            Element root = document.createElement("English");
            root.setAttribute("cat","language");

            Element lan1 = document.createElement("lan");
            lan1.setAttribute("id","1");
            Element name1 = document.createElement("name");
            name1.setTextContent("Java");
            Element ide1 = document.createElement("ide");
            ide1.setTextContent("IntelliJ IDEA");
            lan1.appendChild(name1);
            lan1.appendChild(ide1);

            root.appendChild(lan1);
            document.appendChild(root);

            TransformerFactory transformerFactory = TransformerFactory.newInstance().newInstance();
            Transformer transformer = transformerFactory.newTransformer();
            StringWriter writer = new StringWriter();
            transformer.transform(new DOMSource(document),new StreamResult(writer));
            System.out.println(writer.toString());

            transformer.transform(new DOMSource(document),new StreamResult(new File("newXML.xml")));

        } catch (ParserConfigurationException e) {
            e.printStackTrace();
        } catch (TransformerConfigurationException e) {
            e.printStackTrace();
        } catch (TransformerException e) {
            e.printStackTrace();
        }
    }
}
