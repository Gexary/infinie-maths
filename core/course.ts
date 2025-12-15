interface SchoolLevel {
  slug: string;
  name: string;

  title: string;
  description: string;
  courseCount: number;
}

interface Course {
  slug: string;
  name: string;
  chapter: string;
  description: string;
}

class SchoolLevel {
  getCourses(): Course[] {
    return [];
  }
}
