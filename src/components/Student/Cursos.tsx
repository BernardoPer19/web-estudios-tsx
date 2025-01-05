import {cursos} from '../../DataBase/Cursos'

export const Cursos = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {cursos.map((course, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-4"
            style={{ backgroundColor: "#31304D", color: "#F0ECE5" }}
          >
            <img
              src={course.img}
              alt={course.title}
              className="w-full h-40 object-cover rounded-md"
            />
            <h2 className="text-xl font-bold mt-4">{course.title}</h2>
            <p className="text-sm text-gray-400">{course.description.short}</p>
            <p className="mt-2">
              <span className="font-semibold">Duración:</span> {course.duration}
            </p>
            <p className="mt-1">
              <span className="font-semibold">Precio:</span> ${course.price}
            </p>
            <div className="flex items-center mt-3">
              <img
                src={course.teacher.name}
                alt={course.teacher.name}
                className="w-8 h-8 rounded-full mr-2"
              />
              <span className="text-sm">Instructor: {course.teacher.name}</span>
            </div>
          </div>
        ))}
      </div>
    );
  };
  