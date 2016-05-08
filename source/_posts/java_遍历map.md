title: java遍历Map集合
date: 2013-7-27 18:08:20
categories: 
	- java
tags: 
    - java 
    - 遍历Map
---

　　在java中经常会遇到遍历Map集合的使用场景。
<!-- more -->
#### 最常规的一种遍历方法，最常规就是最常用的，虽然不复杂，但很重要，这是我们最熟悉的，就不多说了！！
    public static void work(Map<String, String> map) {
        Collection<String> c = map.values();
        Iterator it = c.iterator();
        while (it.hasNext()) {
            System.out.println(it.next());
        }
    }

#### 利用keyset进行遍历,它的优点在于可以根据你所想要的key值得到你想要的 values，更具灵活性！！
    public static void workByKeySet(Map<String, String> map) {
        Set<String> key = map.keySet();
        for (Iterator it = key.iterator(); it.hasNext();) {
            String s = (String) it.next();
            System.out.println(map.get(s));
        }
    }

#### 比较复杂的一种遍历在这里，它的灵活性太强了，想得到什么就能得到什么！！
    public static void workByEntry(Map<String, String> map) {
        Set<Map.Entry<String, String>> set = map.entrySet();
        for (Iterator<Map.Entry<String, String>> it = set.iterator(); it.hasNext();) {
            Map.Entry<String, String> entry = (Map.Entry<String, String>) it.next();
            System.out.println(entry.getKey() + "--->" + entry.getValue());
        }
    }
