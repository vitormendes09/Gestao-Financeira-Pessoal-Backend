import { Injectable, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../../dto/user/user.dto.create';
import { UserRepositoryCreate } from 'src/core/infrastructure/persistence/mongoose/repositories/user/user.repository.create';
import { UserRepositoryFindByEmail } from 'src/core/infrastructure/persistence/mongoose/repositories/user/user.repository.findByEmail';

@Injectable()
export class UserServiceSignup {
  constructor(
    private readonly userRepositoryCreate: UserRepositoryCreate,
    private readonly userRepositoryFindByEmail: UserRepositoryFindByEmail,
  ) {}

  async signup(createUserDto: CreateUserDto) {
  console.log('Signup attempt for:', createUserDto.email);
  
  // Verificar se o email já está cadastrado
  const existingUser = await this.userRepositoryFindByEmail.findByEmail(createUserDto.email);
  console.log('Existing user found:', existingUser ? 'Yes' : 'No');
  
  if (existingUser) {
    console.log('Conflict: Email already exists');
    throw new ConflictException('Email já está em uso');
  }

  // Criptografar a senha
  console.log('Hashing password...');
  const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
  
  console.log('Creating user...');
  const user = await this.userRepositoryCreate.create({
    email: createUserDto.email.toLowerCase(),
    password: hashedPassword,
  });

  console.log('User created:', { id: user._id, email: user.email });
  
  const { password, ...result } = user;
  return result;
}
}