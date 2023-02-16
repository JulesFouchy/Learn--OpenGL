---
title: Exemple
---

Afin que vous ayez une idée claire de ce à quoi ressemble un code minimal OpenGL 3 qui affiche un triangle coloré, voici l'exemple du triangle coloré version GL 3+ ! Pas la peine de lire dans le détail à nouveau, vous aurez les TPs pour vous y faire x)

```cpp
#include <p6/p6.h>

int main()
{
    auto ctx = p6::Context{};

    const char* vertexShaderSource = R"STR(
            #version 330
            layout(location = 0) in vec3 iVertexPosition;
            layout(location = 1) in vec3 iVertexColor;
            out vec3 FragColor;

            void main() {
                FragColor = iVertexColor;
                gl_Position = vec4(iVertexPosition, 1.f);
            }
        )STR";

    const char* fragmentShaderSource = R"STR(
            #version 330
            in vec3 FragColor;
            out vec4 oFragColor;
            
            void main() {
                oFragColor = vec4(FragColor, 1.f);
            }
        )STR";

    GLuint vbo, vao;

    glGenBuffers(1, &vbo);

    glBindBuffer(GL_ARRAY_BUFFER, vbo);

    GLfloat vertices[] = {
        -0.5, -0.5, /* Position */ 1., 0., 0., /* Couleur */ // Premier vertex
        0.5, -0.5, /* Position */ 0., 1., 0., /* Couleur */  // Deuxième vertex
        0., 0.5, /* Position */ 0., 0., 1. /* Couleur */     // Troisème vertex
    };

    glBufferData(GL_ARRAY_BUFFER, sizeof(vertices), vertices, GL_STATIC_DRAW);

    glBindBuffer(GL_ARRAY_BUFFER, 0);

    glGenVertexArrays(1, &vao);

    glBindVertexArray(vao);

    glBindBuffer(GL_ARRAY_BUFFER, vbo);

    glEnableVertexAttribArray(0);
    glVertexAttribPointer(
        0,
        2,
        GL_FLOAT,
        GL_FALSE,
        5 * sizeof(GLfloat),
        0);

    glEnableVertexAttribArray(1);
    glVertexAttribPointer(
        1,
        3,
        GL_FLOAT,
        GL_FALSE,
        5 * sizeof(GLfloat),
        (void*)(2 * sizeof(GLfloat)));

    glBindBuffer(GL_ARRAY_BUFFER, 0);

    glBindVertexArray(0);

    GLuint vertexShader = glCreateShader(GL_VERTEX_SHADER);

    glShaderSource(vertexShader, 1, &vertexShaderSource, 0);

    glCompileShader(vertexShader);

    GLint compileStatus;

    glGetShaderiv(vertexShader, GL_COMPILE_STATUS, &compileStatus);
    if (compileStatus == GL_FALSE)
    {
        GLint logLength;
        glGetShaderiv(vertexShader, GL_INFO_LOG_LENGTH, &logLength);

        char* log = new char[logLength];

        glGetShaderInfoLog(vertexShader, logLength, 0, log);
        std::cerr << "Vertex Shader error:" << log << std::endl;
        std::cerr << vertexShaderSource << std::endl;

        delete[] log;
        return 2;
    }

    GLuint fragmentShader = glCreateShader(GL_FRAGMENT_SHADER);

    glShaderSource(fragmentShader, 1, &fragmentShaderSource, 0);

    glCompileShader(fragmentShader);

    glGetShaderiv(fragmentShader, GL_COMPILE_STATUS, &compileStatus);
    if (compileStatus == GL_FALSE)
    {
        GLint logLength;
        glGetShaderiv(fragmentShader, GL_INFO_LOG_LENGTH, &logLength);

        char* log = new char[logLength];

        glGetShaderInfoLog(fragmentShader, logLength, 0, log);
        std::cerr << "Fragment Shader error:" << log << std::endl;
        std::cerr << fragmentShaderSource << std::endl;

        delete[] log;
        return 2;
    }

    GLuint program;

    program = glCreateProgram();

    glAttachShader(program, vertexShader);
    glAttachShader(program, fragmentShader);

    glDeleteShader(vertexShader);
    glDeleteShader(fragmentShader);

    glLinkProgram(program);

    GLint linkStatus;
    glGetProgramiv(program, GL_LINK_STATUS, &linkStatus);
    if (linkStatus == GL_FALSE)
    {
        GLint logLength;
        glGetProgramiv(program, GL_INFO_LOG_LENGTH, &logLength);

        char* log = new char[logLength];

        glGetProgramInfoLog(program, logLength, 0, log);
        std::cerr << "Program link error:" << log << std::endl;

        delete[] log;
        return 2;
    }

    glUseProgram(program);

    ctx.update = [&]() {
        glBindVertexArray(vao);

        glDrawArrays(GL_TRIANGLES, 0 /* Pas d'offset au début du VBO */, 3);

        glBindVertexArray(0);
    };

    ctx.start();

    glDeleteProgram(program);
    glDeleteVertexArrays(1, &vao);
    glDeleteBuffers(1, &vbo);
    return 0;
}
```