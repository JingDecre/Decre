package com.keytop.rwXML;

import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import org.w3c.dom.Document;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import java.io.File;
import java.io.IOException;

/**
 * @author 廖福安（liaofuan@rd.keytop.com.cn）
 * @date 2016/5/9.
 */
public class ReadXML {

    public static  void main(String[] args){

        try {
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance().newInstance();
            DocumentBuilder builder = factory.newDocumentBuilder();
            Document document = builder.parse(new File("languages.xml"));
            Element root = document.getDocumentElement();
            System.out.println("cat="+root.getAttribute("cat"));
            NodeList list = root.getElementsByTagName("lan");
            for (int i = 0; i< list.getLength();i++){
                Element lan = (Element) list.item(i);
                System.out.println("--------");
                System.out.println("id="+lan.getAttribute("id"));

                NodeList clist = lan.getChildNodes();
                for (int j = 0;j < clist.getLength(); j++){
                    Node c = clist.item(j);
                    if(c instanceof Element){
                        System.out.println(c.getNodeName()+"="+c.getTextContent());
                    }
                }
            }
        } catch (ParserConfigurationException e) {
            e.printStackTrace();
        } catch (SAXException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
