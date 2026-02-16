package org.example.studentmanagementsystem.service;

import org.example.studentmanagementsystem.dto.StudentDTO;
import org.example.studentmanagementsystem.entity.Student;
import org.example.studentmanagementsystem.exception.StudentNotFoundException;
import org.example.studentmanagementsystem.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StudentService {

    @Autowired
    private StudentRepository repo;

    private StudentDTO mapToDTO(Student student) {
        return new StudentDTO(
                student.getId(),
                student.getName(),
                student.getEmail(),
                student.getCourse()
        );
    }

    private Student mapToEntity(StudentDTO dto) {
        return new Student(
                dto.getId(),
                dto.getName(),
                dto.getEmail(),
                dto.getCourse()
        );
    }

    public StudentDTO create(StudentDTO dto) {
        Student student = repo.save(mapToEntity(dto));
        return mapToDTO(student);
    }

    public List<StudentDTO> getAll() {
        return repo.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public StudentDTO getById(Long id) {
        Student student = repo.findById(id)
                .orElseThrow(() -> new StudentNotFoundException("Student not found with ID: " + id));
        return mapToDTO(student);
    }

    public StudentDTO update(Long id, StudentDTO dto) {
        Student existing = repo.findById(id)
                .orElseThrow(() -> new StudentNotFoundException("Student not found with ID: " + id));

        existing.setName(dto.getName());
        existing.setEmail(dto.getEmail());
        existing.setCourse(dto.getCourse());

        return mapToDTO(repo.save(existing));
    }

    public void delete(Long id) {
        if (!repo.existsById(id)) {
            throw new StudentNotFoundException("Student not found with ID: " + id);
        }
        repo.deleteById(id);
    }
}

