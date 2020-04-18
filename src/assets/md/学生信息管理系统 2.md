[TOC]

# 学生信息管理系统

## 数据库准备

```sql
create database student;
use student;
create table studle(
  id int primary key auto_increment, 
  name varchar(20), 
  gender varchar(5), 
  phone varchar(20), 
  birthday date, 
  hobby varchar(50), 
  info varchar(200) 
);
```

## 查询

1. __先写Dao，做Dao的实现__

   ```java
   /**
    * 查询所有学生
    * @return List<Student>
    **/
   public interface StudentDao {
       List<Student> findAll() throws SQLException;
   }
   -------------------------------------------------------------------
     public class StudentDaoImpl implements StudentDao {
       @Override
       public List<Student> findAll() throws SQLException {
           QueryRunner queryRunner = new QueryRunner(JDBCUtil.getDataSource());
           String sql = "SELECT * FROM student";
           return queryRunner.query(sql,new BeanListHandler<Student>(Student.class));
       }
   }
   ```

   

2. __再写Service，做Service的实现__

   ```java
   /**
    * 查询所有学生
    * @return List<Student>
    **/
   public interface StudentService {
       List<Student> findAll() throws SQLException;
   }
   -------------------------------------------------------------------
   /**
    * 这是学生业务的实现 返回所有的学生
    * @author monako
    **/
   public class StudentServiceImpl implements StudentService {
       @Override
       public List<Student> findAll() throws SQLException {
           StudentDao studentDao = new StudentDaoImpl();
           return studentDao.findAll();
       }
   }
   ```

3. __在Servlet中存储数据，并做出页面响应__

   ```java
   /**
    * 负责查询所有的学生信息，然后呈现到页面上
    * @author monako
    **/
   public class StudentListServlet extends HttpServlet {
       @Override
       protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
           try{
               // 1. 查询出来所有的学生
               StudentService studentService = new StudentServiceImpl();
               List<Student> studentList = studentService.findAll();
               // 2. 先把数据存储到作用域中
               request.setAttribute("studentList",studentList);
               // 3. 跳转页面
               request.getRequestDispatcher("list.jsp").forward(request,response);
           }catch (SQLException e){
               e.printStackTrace();
           }
       }
   }
   ```

## 增加

1. __先写 StudentAddServlet 方法__

2. __调用 StudentAddServlet__

3. __调用 Dao，完成数据持久化__

4. __爱好的 value 有多个？__

   ```java
   String hobby = Arrays.toString(request.getParameterValues("hobby"));
   hobby = hobby.substring(1,hobby.length()-1);
   ```

* 完整代码

```java
/**
 * 用于处理学生的添加请求
 * @author monako
 **/
public class StudentAddServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");
        // 客户端提交上来的数据
        String name = request.getParameter("name");
        String gender = request.getParameter("gender");
        String phone = request.getParameter("phone");
        String birthday = request.getParameter("birthday");
        String hobby = Arrays.toString(request.getParameterValues("hobby"));
        hobby = hobby.substring(1,hobby.length()-1);
        String info = request.getParameter("info");
        // 2. 添加到数据库
        // String --> Date
        Date date = null;
        try {
            date = new SimpleDateFormat("yyyy-MM-dd").parse(birthday);
            Student student = new Student(name,gender,phone,hobby,info,date);
            StudentService studentService = new StudentServiceImpl();
            studentService.insert(student);
            // 3. 跳转到列表页
            // 再查一次数据库，然后再装到作用域中,然后再跳转
            // 这里是直接跳到页面上，那么这个页面会重新翻译一次，上面那个request的请求的数据是没有了
            // request.getRequestDispatcher("list.jsp").forward(request,response);
            // servlet除了可以跳jsp之外，还能跳servlet
            request.getRequestDispatcher("StudentListServlet").forward(request,response);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

## 删除

```java
/**
 * 删除学生
 * @param id 需要删除的学生
 * @throws SQLException
 **/
public interface StudentDao {
    void delete(int id)throws SQLException;
}
-------------------------------------------------------------------
@Override
public void delete(int id) throws SQLException {
    QueryRunner queryRunner = new QueryRunner(JDBCUtil.getDataSource());
    queryRunner.update("DELETE FROM student where id = ?",id);
}
-------------------------------------------------------------------
@Override
public void delete(int id) throws SQLException {
    StudentDao studentDao = new StudentDaoImpl();
    studentDao.delete(id);
}
-------------------------------------------------------------------
public class StudentDeleteServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try{
            int id = Integer.parseInt(req.getParameter("id"));
            StudentDao studentDao = new StudentDaoImpl();
            studentDao.delete(id);
            req.getRequestDispatcher("StudentListServlet").forward(req,resp);
        }catch (SQLException e){
            e.printStackTrace();
        }
    }
}
```

## 更新

1. __获取指定学生信息__

```java
/**
 * 获取学生信息
 * @param id 需要获取信息的学生
 * @throws SQLException
 **/
Student userInfo(int id)throws SQLException;
-------------------------------------------------------------------
/**
 * 获取学生信息
 * @param id 需要获取信息的学生
 * @throws SQLException
 **/
@Override
public Student userInfo(int id)throws SQLException {
    QueryRunner queryRunner = new QueryRunner(JDBCUtil.getDataSource());
    String sql = "SELECT * FROM student WHERE id = ?";
    return queryRunner.query(sql,new BeanHandler<Student>(Student.class),id);
}
-------------------------------------------------------------------
@Override
public Student userInfo(int id) throws SQLException {
    StudentDao studentDao = new StudentDaoImpl();
    return studentDao.userInfo(id);
}
-------------------------------------------------------------------
public class StudentUserInfoServelet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try{
            int id = Integer.parseInt(req.getParameter("id"));
            StudentService studentService = new StudentServiceImpl();
            Student student = studentService.userInfo(id);
            req.setAttribute("student",student);
            req.getRequestDispatcher("edit.jsp").forward(req,resp);
        }catch (SQLException e){
            e.printStackTrace();
        }
    }
}
```

2. __修改信息__

   ```java
   /**
    * 修改学生
    * @param student 需要修改的学生对象
    * @throws SQLException
    **/
   void update(Student student) throws SQLException;
   -------------------------------------------------------------------
   @Override
   public void update(Student student) throws SQLException {
       QueryRunner queryRunner = new QueryRunner(JDBCUtil.getDataSource());
       queryRunner.update("UPDATE student SET name = ?, gender = ?, phone = ?, birthday = ?,hobby = ?,info = ? WHERE id = ?",
           student.getName(),
           student.getGender(),
           student.getPhone(),
           student.getBirthday(),
           student.getHobby(),
           student.getInfo(),
           student.getId()
       );
   }
   -------------------------------------------------------------------
   @Override
   public void update(Student student) throws SQLException {
       StudentDao studentDao = new StudentDaoImpl();
       studentDao.update(student);
   }
   -------------------------------------------------------------------
   public class StudentEditServelet extends HttpServlet {
       @Override
       protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
           request.setCharacterEncoding("UTF-8");
           // 客户端提交上来的数据
           int id = Integer.parseInt(request.getParameter("id"));
           String name = request.getParameter("name");
           String gender = request.getParameter("gender");
           String phone = request.getParameter("phone");
           String birthday = request.getParameter("birthday");
           String hobby = Arrays.toString(request.getParameterValues("hobby"));
           hobby = hobby.substring(1,hobby.length()-1);
           String info = request.getParameter("info");
           // 2. 添加到数据库
           // String --> Date
           Date date = null;
           try {
               date = new SimpleDateFormat("yyyy-MM-dd").parse(birthday);
               Student student = new Student(name,gender,phone,hobby,info,date,id);
               StudentService studentService = new StudentServiceImpl();
               studentService.update(student);
               // 3. 跳转到列表页
               request.getRequestDispatcher("StudentListServlet").forward(request,response);
           } catch (Exception e) {
               e.printStackTrace();
           }
       }
   }
   ```

   